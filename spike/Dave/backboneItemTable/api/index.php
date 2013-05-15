<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/', 'getItems');
$app->get('/:id',  'getItemInfo');
$app->post('/', 'addItem');
$app->put('/:id', 'updateItem');
$app->delete('/:id',  'deleteItem');

$app->run();

function getItems() {
  $sql = "SELECT ItemType.id as id, ItemType.name as name, quantity, description, Category.id as categoryId, 
           Category.name as categoryName, Vendor.id as vendorId, Vendor.name as vendorName, Vendor.url as vendorUrl 
           FROM ItemType JOIN Category ON ItemType.categoryId = Category.id JOIN Vendor ON ItemType.vendorId = Vendor.id";
  try {
    $db = getConnection();
    $stmt = $db->query($sql);  
    $Items = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    // echo '{"Item": ' . json_encode($Items) . '}';
    echo json_encode($Items);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function getItemInfo($id) {
  $sql = "SELECT ItemType.id as id, ItemType.name as name, quantity, description, Category.id as categoryId, 
           Category.name as categoryName, Vendor.id as vendorId, Vendor.name as vendorName, Vendor.url as vendorUrl 
           FROM ItemType JOIN Category ON ItemType.categoryId = Category.id JOIN Vendor ON ItemType.vendorId = Vendor.id WHERE ItemType.id = :id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $Item = $stmt->fetchObject();  
    $db = null;
    echo json_encode($Item); 
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function addItem() {
  error_log('addItem\n', 3, '/var/tmp/php.log');
  $request = Slim::getInstance()->request();
  $Item = json_decode($request->getBody());
  $sql = "INSERT INTO ItemType (name, quantity, description, categoryId, vendorId) VALUES (:name, :quantity, :description, :categoryId, :vendorId)";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("name", $Item->name);
    $stmt->bindParam("quantity", $Item->quantity);
    $stmt->bindParam("description", $Item->description);
    $stmt->bindParam("categoryId", $Item->categoryId);
    $stmt->bindParam("vendorId", $Item->vendorId);
    $stmt->execute();
    $Item->id = $db->lastInsertId();
    $db = null;
    getItemInfo($Item->id);
  } catch(PDOException $e) {
    error_log($e->getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function updateItem($id) {
  $request = Slim::getInstance()->request();
  $body = $request->getBody();
  $Item = json_decode($body);
  $sql = "UPDATE ItemType SET name=:name, quantity=:quantity, description=:description, categoryId=:categoryId, vendorId=:vendorId WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("name", $Item->name);
    $stmt->bindParam("quantity", $Item->quantity);
    $stmt->bindParam("description", $Item->description);
    $stmt->bindParam("categoryId", $Item->categoryId);
    $stmt->bindParam("vendorId", $Item->vendorId);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $db = null;
    echo json_encode($Item); 
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
}

function deleteItem($id) {
  $sql = "DELETE FROM ItemType WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);  
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
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
