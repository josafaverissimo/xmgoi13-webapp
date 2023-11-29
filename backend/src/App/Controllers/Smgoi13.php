<?php

namespace Src\App\Controllers;

use Src\Core\Controller;

use Src\App\Models\Smgoi13Model;

use Src\Core\Database\Orm;
use Src\Utils\FileUpload;
use Src\Utils\Smg13ColumnsToPersist;

class Smgoi13 extends Controller
{
    private Smgoi13Model $smgoi13Model;
    private FileUpload $fileUpload;
    private Smg13ColumnsToPersist $smg13ColumnsToPersist;

    public function __construct()
    {
        parent::__construct();

        $this->smgoi13Model = new Smgoi13Model();
        $this->fileUpload = new FileUpload();
        $this->smg13ColumnsToPersist = new Smg13ColumnsToPersist();
    }

    private function uploadSmg13(): array
    {
        if(!isset($_FILES['smg13'])) {
            return [
                "error" => true,
                "message" => "smg13 file not send"
            ];
        }
        $smg13File = $_FILES['smg13'];

        if($smg13File["type"] !== "text/csv") {
            return [
                "error" => true,
                "message" => "only allowed csv"
            ];
        }

        $isFileUploaded = $this->fileUpload->uploadFile($smg13File, 'smg13.csv');

        return [
            "error" => !$isFileUploaded
        ];
    }

    private function getSmg13CsvData(): array
    {
        $smg13FileTarget = CONF_UPLOAD_DIR . "/smg13.csv";
        $smg13FileStream = fopen($smg13FileTarget, 'rb');

        fgets($smg13FileStream);
        while($line = fgets($smg13FileStream)) {
            $row = explode(';', $line);

            $this->smg13ColumnsToPersist->addRow($row);
        }

        fclose($smg13FileStream);

        return $this->smg13ColumnsToPersist->getSmg13Data();
    }

    public function getAll(int $offset, int $rowCount = 25): void
    {
        $smg13QueryOptions = [
            'count' => true,
            'limit' => "{$rowCount} OFFSET {$offset}"
        ];
        $term = filter_input(INPUT_GET, 'term');

        if(!empty($term)) {
            $smg13QueryOptions["multipleWhere"] = true;
            $smg13QueryOptions['where'] = [
                [
                    "comparison" => "productCode like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "productDescription like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "productDigit like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "productPacking like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "productStockEmb1 like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "productStockEmb9 like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "productSalePrice like ",
                    "value" => "%{$term}%"
                ]
            ];
        }

        $smg13Data = array_map(function(Orm $orm) {
            return $orm->getRow();
        }, $this->smgoi13Model->getAll($smg13QueryOptions));
        $smg13TotalRows = $this->smgoi13Model->getTotalRows($smg13QueryOptions);

        $this->output([
            'totalRows' => $smg13TotalRows,
            'data' => $smg13Data
        ]);
    }

    public function getByProductCode(string $productCode): void
    {
        $productRow = $this->smgoi13Model->getBy('productCode', $productCode);

        if(empty($productRow)) {
            return;
        }

        $this->output($productRow->getRow());
    }

    public function update(): void
    {
        $status = $this->uploadSmg13();

        if($status['error']) {
            $this->output($status);

            return;
        }

        $smg13Data = $this->getSmg13CsvData();

        $this->smgoi13Model->truncate();

        $errors = [];

        foreach($smg13Data as $row) {
            $this->smgoi13Model->push($row);
            $error = $this->smgoi13Model->getError();

            if(!empty($error[1])) {
                $errors[] = [
                    "row" => $row,
                    "errorInfo" => $error
                ];
            }
        }

        $this->output([
            "error" => false,
            "errors" => $errors
        ]);
    }
}