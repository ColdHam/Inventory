<?php
  ini_set('display_errors',1);
  ini_set('display_startup_errors',1);
  error_reporting(E_ALL|E_STRICT);
  $query = "SELECT supplyID, name, quantity FROM Item_Type";
  $result = db_connection($query);
  $supply = array();
  while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    array_push($supply, array('supplyID' => $row['supplyID'], 'name' =>
      $row['name'], 'quantity' => $row['quantity']));
  }
  echo json_encode(array("supply" => $supply));
  exit;

  function db_connection($query) {
    mysql_connect('localhost','ba','ba')
      OR die(fail('Could not connect to database.'));
    mysql_select_db('InvControl');
    return mysql_query($query);
  }

  function fail($message) {
    die(json_encode(array('status' => 'fail', 'message' => $message)));
  }

  function success($message) {
    die(json_encode(array('status' => 'success', 'message' => $message)));
  }
?>
