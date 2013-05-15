<html>
<head>
<link rel="stylesheet" href="itunes.css">
</head>
<body>
<table>
<?php
//connect to the db
$connection = mysqli_connect('localhost','root','rich176ax','testInvControl');

//display contents
$query = "SELECT * FROM Supply";
$result = mysqli_query($connection, $query) or die('cannot show tables');
$rowNum = 1;
while($row = mysqli_fetch_array($result))
{
  if($rowNum % 2 != 0)
  {
    echo '<tr><td>';
  }
  else
  {
    echo '<tr class="odd"><td>';
  }
  echo $row['supplyid'],'</td><td>',$row['description'],'</td><td>',$row['qty'],'</td></tr>';
  $rowNum++;
}
mysqli_close($connection);
?>
</table>
</body>
</html>
