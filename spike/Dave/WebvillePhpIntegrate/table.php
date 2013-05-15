<?php
  ini_set('display_errors',1);
  ini_set('display_startup_errors',1);
  error_reporting(E_ALL|E_STRICT);
  $query = "SELECT * FROM Supply";
  $result = db_connection($query);
  $supply = array();
  while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    array_push($supply, array('supplyid' => $row['supplyid'], 'name' =>
      $row['description'], 'qty' => $row['qty']));
  }
  echo json_encode(array("supply" => $supply));
  exit;

  function db_connection($query) {
    mysql_connect('localhost','root','rich176ax')
      OR die(fail('Could not connect to database.'));
    mysql_select_db('testInvControl');
    return mysql_query($query);
  }

  function fail($message) {
    die(json_encode(array('status' => 'fail', 'message' => $message)));
  }

  function success($message) {
    die(json_encode(array('status' => 'success', 'message' => $message)));
  }
?>
