<?php

namespace Src\App\Controllers;

use Src\App\Models\CustomerModel;
use Src\Core\Controller;
use Src\Utils\FormValidation\FieldToValidate;
use Src\Utils\FormValidation\FormValidation;
use Src\Utils\Helpers;

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
            $this->output($this->formValidation->getErrorMessages());

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