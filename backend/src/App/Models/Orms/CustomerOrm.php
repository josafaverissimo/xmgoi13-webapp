<?php

namespace Src\App\Models\Orms;

use Src\Core\Database\Orm;

class CustomerOrm extends Orm
{
    public function __construct() {
        $this->row = (object) [
          "id" => null,
          "name" => null,
          "socialReason" => null,
          "cnpj" => null,
          "phone" => null,
          "email" => null,
          "createdAt" => null,
          "lastPurchaseDay" => null
        ];
    }
}