<?php

namespace Src\App\Models;

use Src\Core\Database\Model;
use Src\App\Models\Orms\Smgoi13Orm;

class Smgoi13Model extends Model
{
    public function __construct()
    {
        parent::__construct("xmg_smg13", new Smgoi13Orm());
    }
}