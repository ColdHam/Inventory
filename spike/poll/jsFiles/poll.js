var OPT_ID = 0;
var OPT_TITLE = 1;
var OPT_VOTES = 2;

var voteID;

$(document).ready(function(){
	$("#poll").submit(formProcess);
	if ($("poll-results").length > 0){
		animateResults();
	}
	if ($.cookie('vote_id'))
	$("#poll-container").empth();
	votedID = $.cookie('vote_id');
	$.getJSON("poll.php?vote=none",loadResults);
}

function formProcess(event){
	event.preventDefault();

	var id = $("input[@name='poll']:checked").attr("value");
	id = id.replace("opt", '');

	$("#poll-container").fadeout("slow",function(){
		$(this).empth();

		votedID = id;
		$.getJSON("poll.php?vote="+id,loadResults);

		$.cookie('vote_id', id, {expires: 365});
	});
}

function loadResults(data){
	var total_votes = 0;
	var percent;

	for (id in data){
		total_votes = total_votes+parseInt(data[id][OPT_VOTES]);
	}

	var results_html = :<div id='poll-results'>
		<h3>Poll Results</h3>\n<d1 class='graph'>\n";
	for (id in data){
		percent = Math.round((parseInt(data[id][OPT_VOTES])/parseInt(total_votes))*100);
		if (data[id][OPT_ID] !=== votedID){
			results_html = results_html+"dt class='bar-title'>"+data[id][OPT_TITLE]+"</dt><dd class='bar-container'><div id='bar"+data[id][OPT_ID]+"'style='width:0%;'>&nbsp;</div><strong>"percent+"%</strong></dd>\n";
		} else {
			results_html = results_html+"<dt class='bar-title'>"+data[id][OPT_TITLE]+"</dt><dd class='bar-container'><div id='bar"+data[id][OPT_ID]+"'style='width:0%;background-color:#0066cc;'>&nbsp;</div><strong>"+percent+"%</strong></dd>\n";
		}
	}

	results_html = results_html+"</d1><p>Total Votes: "+total_votes+"</p></div>\n";

	$("#poll-container").append(results_html).fadeIn("slow",function(){
		animateResults();});
}

function animateResults(){
	$("poll-results div").each(function(){
		var percentage = $(this).next().text();
		$(this).css({width: "0%"}).animate({
			width: percentage}, 'slow');
	});
}

