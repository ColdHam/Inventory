window.onload = init;
function init() {
  var button = document.getElementById("addButton");
  button.onclick = handleButtonClick;
  loadPlaylist();
//  var roll = document.getElementById("num1");
//  roll.onMouseOver = handleMouseOver;
  }

function handleButtonClick() {
  var textInput = document.getElementById("songTextInput");
  var songName = textInput.value;
  var num;
  if (num === undefined)
  {
    num = 1;
  }
  else
  {
    num++;
  }
  if (songName === "") {
    alert("Please enter a song");
  }
  else {
    //alert("Adding " + songName);
    var li = document.createElement("li");
//    li.setAttribute("id", "num" + num);
    li.innerHTML = songName;
    var ul = document.getElementById("playlist");
    ul.appendChild(li);
    save(songName);
  }
}

//function handleMouseOver() {
//  alert("over");
//}
