<?php

namespace Src\App\Models\Orms;

use Src\Core\Database\Orm;

class Smgoi13Orm extends Orm
{
    public function __construct()
    {
        $this->row = (object) [
            "id" => null,
            "productCode" => null,
            "productDigit" => null,
            "productDescription" => null,
            "productPacking" => null,
            "productStockEmb1" => null,
            "productStockEmb9" => null,
            "productSalePrice" => null
        ];
    }
}