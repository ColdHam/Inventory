<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/appointments/:id','getAppointments');

$app->run();

function getAppointments($id) {
  if ($id == "1") {
    echo '[{"id": "1", "title": "id 1"}]';
  }
  if ($id == "2") {
    echo '[{"id": "2","title": "id 2"}]';
  }
}
?>
