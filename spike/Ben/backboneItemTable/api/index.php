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
  $sql = "select i.id as id, i.name AS name, i.description, i.quantity, c.name AS category, v.name AS vendor, c.id AS categoryId, v.id AS vendorId
          FROM ItemType AS i, Category AS c, Vendor AS v
          WHERE i.categoryId = c.id AND i.vendorId = v.id ORDER BY i.name";
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
  error_log('addItem\n', 3, '/var/tmp/php.log');
  $request = Slim::getInstance()->request();
  $item = json_decode($request->getBody());
  $sql = "INSERT INTO ItemType (name, quantity, categoryId, vendorId, description) VALUES (:name, :quantity, :categoryId, :vendorId, :description)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("name", $item->name);
    $stmt->bindParam("quantity", $item->quantity);
    $stmt->bindParam("categoryId", $item->categoryId);
    $stmt->bindParam("vendorId", $item->vendorId);
    $stmt->bindParam("description", $item->description);
    $stmt->execute();
    $item->id = $db->lastInsertId();
    $db = null;
    echo json_encode($item); 
  } catch(PDOException $e) {
    error_log($e->getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
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
