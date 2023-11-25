<?php

namespace Src\App\Controllers;

use Src\Core\Controller;
use Src\Utils\FormValidation\FieldToValidate;
use Src\Utils\FormValidation\FormValidation;
use Src\Utils\Helpers;

class Customers extends Controller
{
    private function validateCustomerData($customerData): bool
    {
        $fieldsToValidate = [
            new FieldToValidate('name', 'isRequired'),
            new FieldToValidate('socialReason', 'isRequired'),
            new FieldToValidate('cnpj', 'isRequired|isCnpj|length=14'),
            new FieldToValidate('phone', 'isRequired|isCnpj|minLength=10|maxLength=11')
        ];
        $formValidation = new FormValidation($fieldsToValidate, $customerData);

        return true;
    }

    public function create(): void
    {
        $postData = Helpers::filterInputArray();

        $this->validateCustomerData($postData);
    }
}