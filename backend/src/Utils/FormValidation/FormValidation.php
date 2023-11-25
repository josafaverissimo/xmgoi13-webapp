<?php

namespace Src\Utils\FormValidation;

class FormValidation
{
    /** @var FieldToValidate[] $fieldsToValidate */
    private array $fieldsToValidate;
    private array $dataToValidate;

    private function isFieldToValidateInDataFields(string $fieldToCheck): bool
    {
        return in_array($fieldToCheck, $this->dataToValidate);
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
        $errorMessages = [];

        foreach($this->fieldsToValidate as $fieldToValidate) {
            $fieldName = $fieldToValidate->getName();

            if(!$this->isFieldToValidateInDataFields($fieldName)) {
                if($fieldToValidate->isRequired()) {
                    $errorMessages[$fieldName] = "field is missing";
                }

                continue;
            }

            $fieldValue = $this->dataToValidate[$fieldName];
            $fieldToValidate->setValue($fieldValue);



            return count($errorMessages) > 0;
        }
    }
}