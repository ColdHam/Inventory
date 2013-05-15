<?php

require 'Slim/Slim.php';

$app = new Slim();


$app->get('/items', 'getItems');
$app->get('/items/:id','getItemInfo');
$app->post('/items', 'addItem');
$app->put('/items/:id', 'updateItem');
$app->delete('/items/:id',  'deleteItem');
$app->run();

function getItems() {
  
}

function getItemsInfo($id) {
  if ($id == "1") {
    echo '[{"id": "1", "title": "id 1"}]';
  }
  if ($id == "2") {
    echo '[{"id": "2","title": "id 2"}]';
  }
}

function addItem() {

}

function updateItem() {
  
}

function deleteItem() {
  
}
?>
