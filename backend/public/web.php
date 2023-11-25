<?php

use Src\Core\Router\Router;

$router = new Router();

$router->group(["prefix" => "smgoi13"], function() {
    $this->get('/getAll/(:numeric)', "Smgoi13:getAll");
    $this->get('/getAll/(:numeric)/(:numeric)', "Smgoi13:getAll");
    $this->get('/getAll/(:numeric)/(:numeric)/(:any)', "Smgoi13:getAll");
    $this->post("/update", "Smgoi13:update");
});

$router->group(["prefix" => "customers"], function() {
   $this->post('/create', "Customers:create");
});

$router->dispatch();

