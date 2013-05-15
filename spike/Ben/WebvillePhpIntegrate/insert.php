<?php
  $desc = $_POST['name'];
  $qty = $_POST['quantity'];

  $dbc = mysqli_connect('localhost','root','amber123','testInvControl');
  $query = "INSERT INTO Supply (description, qty) VALUES ('$desc', '$qty')";

  mysqli_query($dbc, $query) or die('Error Inserting To Database');
  mysqli_close($dbc);
?>
