<html>
<head>
<link rel="stylesheet" href="csstable.css">
</head>
<body>
<table>
<?php

$connection = mysqli_connect('localhost','root','hp','TestInvControl');

$query = "SELECT * FROM Supply";
$result = mysqli_query($connection, $query) or die('cannot show tables');

while($row = mysqli_fetch_array($result))
{
  echo '<tr><td>',$row['supplyid'],'</td><td>',$row['desc'],'</td><td>',$row['quantity'],'</td></tr>';
}

mysqli_close($connection);
?>
</table>
</body>
</html>


