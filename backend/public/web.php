<?php

use Src\Core\Router\Router;

$router = new Router();

$router->group(["prefix" => "smgoi13"], function() {
    $this->get('/getAll/(:numeric)', "Smgoi13:getAll");
    $this->post("/update", "Smgoi13:update");
});

$router->dispatch();

