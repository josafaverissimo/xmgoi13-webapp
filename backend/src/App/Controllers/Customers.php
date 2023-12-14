<?php

namespace Src\App\Controllers;

use Src\App\Models\CustomerModel;
use Src\Core\Controller;
use Src\Utils\FormValidation\FieldToValidate;
use Src\Utils\FormValidation\FormValidation;
use Src\Utils\Helpers;
use Src\Core\Database\Orm;

class Customers extends Controller
{
    private FormValidation $formValidation;
    private CustomerModel $customerModel;

    public function __construct() {
        parent::__construct();

        $this->formValidation = new FormValidation();
        $this->customerModel = new CustomerModel();
    }

    private function validateCustomerData(array $customerData): bool
    {
        $fieldsToValidate = [
            new FieldToValidate('name', 'isRequired'),
            new FieldToValidate('socialReason', 'isRequired'),
            new FieldToValidate('cnpj', 'isRequired|length=14'),
            new FieldToValidate('phone', 'isRequired|minLength=10|maxLength=11'),
            new FieldToValidate('email', 'isEmail')
        ];
        $this->formValidation->setFieldsToValidate($fieldsToValidate, $customerData);

        return $this->formValidation->validate();
    }

    public function getByCnpj(string $cnpj) {
        $customerOrm = $this->customerModel->getBy("cnpj", $cnpj);

        if(empty($customerOrm)) {
            $this->output([
                'error' => true,
                'message' => 'customer not found'
            ]);

            return;
        }

        $this->output($customerOrm->getRow());
    }

    public function getAll(int $offset = -1, int $rowCount = 25): void
    {
        $customersQueryOptions = [];

        if($offset !== -1) {
            $customersQueryOptions = [
                'count' => true,
                'limit' => "{$rowCount} OFFSET {$offset}"
            ];
        }
        
        $term = filter_input(INPUT_GET, 'term');

        if(!empty($term)) {
            $customersQueryOptions["multipleWhere"] = true;
            $customersQueryOptions['where'] = [
                [
                    "comparison" => "name like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "socialReason like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "cnpj like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "phone like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "email like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "createdAt like ",
                    "value" => "%{$term}%",
                    "operator" => "OR"
                ],
                [
                    "comparison" => "lastPurchaseDay like ",
                    "value" => "%{$term}%"
                ]
            ];
        }
        $customersData = array_map(function(Orm $orm) {
            return $orm->getRow();
        }, $this->customerModel->getAll($customersQueryOptions));
        $customersDataTotalRows = $this->customerModel->getTotalRows($customersQueryOptions);

        $this->output([
            "totalRows" => $customersDataTotalRows,
            "data" => $customersData
        ]);
    }

    public function create(): void
    {
        $postData = Helpers::filterInputArray();

        if(empty($postData)) {
            $this->output([
                'error' => true,
                'message' => 'data is empty'
            ]);

            return;
        }

        $isCustomerDataValid = $this->validateCustomerData($postData);

        if(!$isCustomerDataValid) {
            $this->output([
                'error' => true,
                'formValidation' => $this->formValidation->getErrorMessages()
            ]);

            return;
        }

        $validatedFields = $this->formValidation->getFieldsValues();
        $fieldsToSave = array_merge($validatedFields, [
            'createdAt' => date('Y-m-d H:i:s')
        ]);

        $lastInsertId = $this->customerModel->push($fieldsToSave);

        $this->output([
            'error' => empty($lastInsertId)
        ]);
    }

    public function updateLastPurchaseDay(string $customerDocument): void
    {
        $customerDocument = filter_var($customerDocument, FILTER_SANITIZE_SPECIAL_CHARS);

        $set = [
            "lastPurchaseDay" => date('Y-m-d H:i:s')
        ];

        $where = [
            "column" => "cnpj",
            "value" => $customerDocument
        ];

        $affectedRows = $this->customerModel->update($set, $where);

        $this->output([
            'error' => !($affectedRows > 0)
        ]);
    }
}