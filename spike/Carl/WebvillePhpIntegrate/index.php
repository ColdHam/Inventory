<html>
<head>
<script src="javascriptFiles/supply.js"></script>
<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<link rel="stylesheet" href="cssFiles/csstable.css">
<link rel="stylesheet" href="cssFiles/playlist.css">


</head>
<body>

<div id="form">
  <form>
    <input type="text" id="supplyTextInput" size="40" placeholder="Supply name">
    <input type="text2" id="qtyInput" size = "15" placeholder="Quantity">
    <input type="button" id="addButton" value="Add Supply">
  </form>
</div>

<table id='supply'>
<?php
/*
//$connection = mysqli_connect('localhost','root','hp','TestInvControl');

$query = "SELECT * FROM Supply";
$result = mysqli_query($connection, $query) or die('cannot show tables');

while($row = mysqli_fetch_array($result))
{
  echo '<tr><td>',$row['supplyid'],'</td><td>',$row['desc'],'</td><td>',$row['quantity'],'</td></tr>';
}

mysqli_close($connection);
 */
?>
</table>
</body>
</html>


