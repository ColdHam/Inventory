<?php
  $desc = $_POST['name'];
  $qty = $_POST['quantity'];

  $dbc = mysqli_connect('localhost','ba','ba','InvControl');
  $query = "INSERT INTO Item_Type (name, quantity) VALUES ('$desc', '$qty')";

  mysqli_query($dbc, $query) or die('Error Inserting To Database');
  mysqli_close($dbc);
?>
