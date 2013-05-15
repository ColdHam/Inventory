window.onload = init;
function init() {
  var button = document.getElementById("addButton");
  button.onclick = handleButtonClick;
  buildTable();
  }

function createRequest() {
  request = new XMLHttpRequest();
  return request;
}

function handleButtonClick() {
  var supplyTextInput = document.getElementById("supplyTextInput");
  var supplyName = supplyTextInput.value;
  var quantityTextInput = document.getElementById("quantityTextInput");
  var supplyQuantity = quantityTextInput.value;

  if (supplyName === "") {
    alert("Please enter a supply");
  }
  else {
    if (supplyQuantity === "") {
      alert("Please enter a quantitiy");
    }
    else {
      request = createRequest();
      if (request === null) {
        alert("Unable to create request");
      }
      else {
        var url = "insert.php";
        request.open("POST",url,true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = buildTable;
        request.send("name=" + supplyName + "&quantity=" + supplyQuantity);
      }
    }
  }
}

function displayOkay() {
  if(request.readyState == 4 && request.status == 200) {
    var returnData = request.responseText;
    alert("Item added" + returnData);
  }
}

function buildTable() {
    $.getJSON("table.php", function(json) {
      if (json.supply.length>0) {
        //alert("Should be udating DOM here");
        $('#supplyTable').empty();
        $.each(json.supply,function() {
          var info = '<tr><td>' + this['supplyid'] + '</td><td>' +
          this['name'] + '</td><td>' + this['qty'] + '</td></tr>';
          $('#supplyTable').append(info);
        });
      }
      else {
        alert("No returned data");
      }
  });
}

