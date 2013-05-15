<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/', 'getItems');
$app->get('/items/:id','getItemInfo');
$app->post('/', 'addItem');
$app->put('items/:id', 'updateItem');
$app->delete('items/:id',  'deleteItem');
$app->run();

function getItems() {
  $sql = "select * FROM ItemType ORDER BY name";
  try {
    $db = getConnection();
    $stmt = $db->query($sql);  
    $items = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;

    // echo '{"wine": ' . json_encode($wines) . '}';

    echo json_encode($items);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }

}

function getItemsInfo($id) {
  echo 'getOne';
}

function addItem() {
  echo 'Insert';
}

function updateItem($id) {
  echo 'Update';
}

function deleteItem($id) {
  echo'Delete';
}

function getConnection() {
  $dbhost="127.0.0.1";
  $dbuser="ba";
  $dbpass="baba";
  $dbname="InvControl";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}

?>
