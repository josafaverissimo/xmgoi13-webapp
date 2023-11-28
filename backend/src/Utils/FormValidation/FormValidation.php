<?php

namespace Src\Utils\FormValidation;

class FormValidation
{
    /** @var FieldToValidate[] $fieldsToValidate */
    private array $fieldsToValidate;
    private array $dataToValidate;
    private array $errorMessages;

    public function __construct(array $fieldsToValidate = [], array $dataToValidate = []) {
        $this->errorMessages = [];

        $this->setFieldsToValidate($fieldsToValidate, $dataToValidate);
    }

    private function isFieldToValidateInDataFields(string $fieldToCheck): bool
    {
        return in_array($fieldToCheck, array_keys($this->dataToValidate));
    }

    public function getFieldsValues(): array
    {
        return array_reduce($this->fieldsToValidate, function(array $fields, FieldToValidate $field) {
            $fieldName = $field->getName();
            return array_merge($fields, [$fieldName => $this->dataToValidate[$fieldName]]);
        }, []);
    }

    public function getErrorMessages(): array
    {
        return $this->errorMessages;
    }

    /**
     * @param FieldToValidate[] $fieldsToValidate
     * @param array $dataToValidate
     */
    public function setFieldsToValidate(array $fieldsToValidate, array $dataToValidate): void
    {
        $this->fieldsToValidate = $fieldsToValidate;
        $this->dataToValidate = $dataToValidate;
    }

    public function validate(): bool
    {
        $this->errorMessages = [];
        $error = false;

        foreach($this->fieldsToValidate as $fieldToValidate) {
            $fieldName = $fieldToValidate->getName();
            $this->errorMessages[$fieldName]['errorMessages'] = [];

            if(!$this->isFieldToValidateInDataFields($fieldName)) {
                if($fieldToValidate->isRequired()) {
                    $error = true;
                    $this->errorMessages[$fieldName]['errorMessages']['isRequired'] = "field is missing";
                }

                continue;
            }

            $fieldValue = $this->dataToValidate[$fieldName];
            $fieldToValidate->setValue($fieldValue);

            if(!$fieldToValidate->validateLength()) {
                $error = true;
                $lengthOption = $fieldToValidate->getOptionValue('length');
                $this->errorMessages[$fieldName]['errorMessages']['length'] = "field length is not equal to {$lengthOption}";
            }

            if(!$fieldToValidate->validateMinLength()) {
                $error = true;
                $minLengthOption = $fieldToValidate->getOptionValue('minLength');
                $this->errorMessages[$fieldName]['errorMessages']['minLength'] = "field has no min length {$minLengthOption}";
            }

            if(!$fieldToValidate->validateMaxLength()) {
                $error = true;
                $maxLengthOption = $fieldToValidate->getOptionValue('maxLength');
                $this->errorMessages[$fieldName]['errorMessages']['maxLength'] = "field has no max length {$maxLengthOption}";
            }

            if(!$fieldToValidate->validateEmail()) {
                $error = true;
                $this->errorMessages[$fieldName]['errroMessages']['isEmail'] = "field is not a valid email";
            }
        }

        return !$error;
    }
}