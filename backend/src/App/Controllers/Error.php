<?php

namespace Src\App\Controllers;

use Src\Core\Controller;

class Error extends Controller
{
    public function error404(): void
    {
        $this->output([
            "error" => true,
            "message" => "route not found"
        ]);
    }
}