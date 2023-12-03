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

    public function getAll(): void
    {
        $customersData = array_map(function(Orm $orm) {
            return $orm->getRow();
        }, $this->customerModel->getAll());


        $this->output($customersData);
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
}