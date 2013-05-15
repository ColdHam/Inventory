<?php

require 'Slim/Slim.php';
//\Slim\Slim::registerAutoloader();

$app = new Slim();

$app->get('/items', function(){});//'getItems');
$app->get('/items/:id',function(){});//'getItemInfo');
$app->post('/items', 'addItem');
$app->put('/items/:id', 'updateItem');
$app->delete('/items/:id',  'deleteItem');
$app->run();

function getItems() {
  echo "getAll";
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
 

?>
