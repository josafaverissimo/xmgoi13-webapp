<?php

namespace Src\Utils;

class Smg13ColumnsToPersist
{
    private array $columnsToPersist;
    private array $rows;

    public function __construct() {
        $this->columnsToPersist = [
            "productCode" => ["index" => 5],
            "productDigit" => ["index" => 6],
            "productDescription" => ["index" => 8],
            "productPacking" => ["index" => 9],
            "productStockEmb1" => ["index" => 22],
            "productStockEmb9" => ["index" => 23],
            "productSalePrice" => ["index" => 25, "formatValue" => fn($value) => str_replace(',', '.', $value)]
        ];
    }

    public function addRow(array $row): void {
        $this->rows[] = $row;
    }

    public function getSmg13Data(): array {
        return array_reduce($this->rows, function($rows, $row) {
            $rowsFiltered = array_reduce(array_keys($this->columnsToPersist), function($columns, $column) use ($row) {
                $columnTarget = $this->columnsToPersist[$column]["index"];
                $cell = preg_replace("/ +/", " ", trim($row[$columnTarget]));

                if(isset($this->columnsToPersist[$column]["formatValue"])) {
                    $cell = $this->columnsToPersist[$column]["formatValue"]($cell);
                }

                return array_merge($columns, [$column => $cell]);
            }, []);

            return array_merge($rows, [$rowsFiltered]);
        }, []);
    }
}
