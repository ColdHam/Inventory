window.onload = init;

function init(){
  var button = document.getElementById("addButton");
  button.onclick = handleButtonClick;
  buildTable();

}

function createRequest(){
  request = new XMLHttpRequest();
  return request;
}

function handleButtonClick()
{
  var textInput = document.getElementById("supplyTextInput");
  var text2Input = document.getElementById("qtyInput");
  var supplyName = textInput.value;
  var supplyQty = text2Input.value;

  if (supplyName === "")
  {
   alert("Please enter the name of a Supply");
  }
  else if (supplyQty === "")
  {
    alert("Please enter a Quantity");
  }
  else
  {
    request = createRequest();
    if (request === null)
    {
      alert("unable to create request");
    }
    else
    {
      var url = "insert.php";
      request.open("POST",url,true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.onreadystatechange = buildTable;
      request.send("name=" + supplyName + "&quantity=" + supplyQty);

    }
  }
}


function displayOkay()
{
  if(request.readyState === 4 && request.status === 200)
  {
    var returnData = request.responseText;
    alert("Item added " + returnData);
    buildTable();
  }
}


function buildTable()
{
  $.getJSON("table.php", function(json) {
    $('table#supply').empty();
    $.each(json.supply,function(){
    var info = '<tr><td>' + this['supplyid'] + '</td><td>' + this['desc'] + '</td><td>' + this['quantity'] + '</td></tr>';
    $('table#supply').append(info);
    })
  });

}


