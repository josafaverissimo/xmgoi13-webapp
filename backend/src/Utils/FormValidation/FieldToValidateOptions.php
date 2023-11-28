<?php

namespace Src\Utils\FormValidation;

class FieldToValidateOptions
{
    private array $optionsValuesByOptionName = [];

    private ?bool $isRequired;
    private ?int $length;
    private ?int $minLength;
    private ?int $maxLength;
    private ?bool $isEmail;
    private array $setValueByOption;

    public function __construct(string $options = '') {
        $this->initSetValueByOption();
        $this->initOptions();
        $this->setOptions($options);

        $this->optionsValuesByOptionName = [
            'required' => $this->isRequired,
            'length' => $this->length,
            'minLength' => $this->minLength,
            'maxLength' => $this->maxLength,
            'isEmail' => $this->isEmail
        ];
    }

    private function initSetValueByOption(): void
    {
        $this->setValueByOption = [
            "isRequired" => fn() => $this->isRequired = true,
            "length" => fn($length) => $this->length = $length,
            "minLength" => fn($minLength) => $this->minLength = $minLength,
            "maxLength" => fn($maxLength) => $this->maxLength = $maxLength,
            "isEmail" => fn() => $this->isEmail = true
        ];
    }

    public function initOptions(): void
    {
        $this->isRequired = null;
        $this->length = null;
        $this->minLength = null;
        $this->maxLength = null;
        $this->isEmail = null;
    }

    public function setOptions(string $options): void
    {
        if(empty($options)) return;

        $explodedOptions = explode('|', $options);

        foreach($explodedOptions as $option) {
            $explodedOption = explode("=", $option);
            $optionName = $explodedOption[0];
            $optionValue = $explodedOption[1] ?? null;

            $this->setValueByOption[$optionName]($optionValue);
        }
    }

    public function getOption(string $option) {
        return $this->optionsValuesByOptionName[$option] ?? null;
    }
}