<?php

namespace Src\App\Models;

use Src\Core\Database\Model;
use Src\Core\Database\Orm;

use Src\App\Models\Orms\CustomerOrm;

class CustomerModel extends Model
{
    public function __construct()
    {
        parent::__construct("xmg_customers", new CustomerOrm());
    }
}