function createRequest() {
  request = new XMLHttpRequest();
  //alert('request created');
  return request;
}

function inputValidate(passedSupplyName, passedSupplyQuantity) {
  if (passedSupplyName === "") {
    return 2;
  }
  else {
    if (passedSupplyQuantity === "") {
      return 1;
    }
    else
    {
      //alert('returning 0');
      return 0;
    }
  }

}


function handleButtonClick() {
  //alert('WE CLICKED THE BUTTON');
  var supplyName = $("#supplyTextInput").text();
  var supplyQuantity = $("#quantityTextInput").text();

  var validateResult = inputValidate(supplyName, supplyQuantity);
  switch(validateResult) {
    case 2:
      alert("Please enter a supply");
      break;

    case 1:
      alert("Please enter a quantity");
      break;

    case 0:
     //alert('time to create dat request');
     request = createRequest();
      if (request === null) {
        alert("Unable to create request");
      }
      else {
        //alert('entering the Request');
        var url = "api/insert.php";
        request.open("POST",url,true);
        //alert('open bitches');
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = buildTable;
        //alert('build the table and then send');
        request.send("name=" + supplyName + "&quantity=" + supplyQuantity);
        //alert('sent that shit');
        clearTextboxes();
        //alert('done');
      }
      break;
  }
}

function clearTextboxes() {
	//alert('clearin textboxes');
  $("#supplyTextInput").val('');
  $("#quantityTextInput").val('');
}


function displayOkay() {
  if(request.readyState == 4 && request.status == 200) {
    var returnData = request.responseText;
    alert("Item added" + returnData);
  }
}


function buildTable() {
    $.getJSON("api/table.php", function(json) {
      if (json.supply.length>0) {
        //alert("Should be udating DOM here");
        $('#supplyTable').empty();
        $.each(json.supply,function() {
          var info = '<tr><td>' + this['supplyID'] + '</td><td>' +
          this['name'] + '</td><td>' + this['quantity'] + '</td></tr>';
          $('#supplyTable').append(info);
        });
      }
      else {
        alert("No returned data");
      }
  });
}

