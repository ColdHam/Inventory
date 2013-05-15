<?php
  $desc = $_POST['name'];
  $quantity = $_POST['quantity'];

  $dbc = mysqli_connect('localhost','root','hp','TestInvControl');
  //$query = "INSERT INTO Supply (desc, quantity) VALUES (Shit, 3)";
  $query = "INSERT INTO Supply (`desc`, `quantity`) VALUES ('$desc', '$quantity')";
  //$query = "SELECT * FROM Supply";
  mysqli_query($dbc, $query) or die(' ERROR INSERTING INTO DATABASE');
  mysqli_close($dbc);
?>


