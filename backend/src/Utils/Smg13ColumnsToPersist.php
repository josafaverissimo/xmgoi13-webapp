<?php

namespace Src\Utils;

class Smg13ColumnsToPersist
{
    private array $columnsToPersist;
    private array $rows;

    public function __construct() {
        $this->columnsToPersist = [
            "productCodeDigit" => ["index" => 0],
            "productDescription" => ["index" => 2],
            "productPacking" => ["index" => 3],
            "productStockEmb1" => ["index" => 21],
            "productStockEmb9" => ["index" => 22],
            "productSalePrice" => ["index" => 24, "formatValue" => fn($value) => str_replace(',', '.', $value)]
        ];
    }

    public function addRow(array $row): void {
        $this->rows[] = $row;
    }

    public function getSmg13Data(): array {
        return array_reduce($this->rows, function($rows, $row) {
            $rowFiltered = array_reduce(array_keys($this->columnsToPersist), function($columns, $column) use ($row) {
                $columnTarget = $this->columnsToPersist[$column]["index"];
                $cell = mb_convert_case(
                    preg_replace("/ +/", " ", trim($row[$columnTarget])),
                    MB_CASE_LOWER
                );

                if(isset($this->columnsToPersist[$column]["formatValue"])) {
                    $cell = $this->columnsToPersist[$column]["formatValue"]($cell);
                }

                return array_merge($columns, [$column => $cell]);
            }, []);
           
            $productCodeDigitExploded = explode('-', $rowFiltered['productCodeDigit']);
            $rowFiltered['productCode'] = $productCodeDigitExploded[0];
            $rowFiltered['productDigit'] = $productCodeDigitExploded[1];
            unset($rowFiltered['productCodeDigit']);

            return array_merge($rows, [$rowFiltered]);
        }, []);
    }
}
