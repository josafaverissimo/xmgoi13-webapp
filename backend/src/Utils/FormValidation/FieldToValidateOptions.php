<?php

namespace Src\Utils\FormValidation;

class FieldToValidateOptions
{
    private ?bool $isRequired;
    private ?int $length;
    private ?int $minLength;
    private ?int $maxLength;
    private ?bool $isPhone;
    private ?bool $isCnpj;
    private array $setValueByOption;


    public function __construct(string $options) {
        $this->initSetValueByOption();
        $this->initOptions();
        $this->setOptions($options);
    }

    private function initSetValueByOption(): void
    {
        $this->setValueByOption = [
            "isRequired" => fn() => $this->isRequired = true,
            "length" => fn($length) => $this->length = $length,
            "minLength" => fn($minLength) => $this->minLength = $minLength,
            "maxLength" => fn($maxLength) => $this->maxLength = $maxLength,
            "isPhone" => fn() => $this->isPhone = true,
            "isCnpj" => fn() => $this->isCnpj = true
        ];
    }

    public function initOptions(): void
    {
        $this->isRequired = null;
        $this->length = null;
        $this->minLength = null;
        $this->maxLength = null;
        $this->isPhone = null;
        $this->isCnpj = null;
    }

    public function setOptions(string $options): void
    {
        $explodedOptions = explode('|', $options);

        foreach($explodedOptions as $option) {
            $explodedOption = explode("=", $option);
            $optionName = $explodedOption[0];
            $optionValue = $explodedOption[1] ?? null;

            $this->setValueByOption[$optionName]($optionValue);
        }
    }

    public function getIsRequired(): ?bool
    {
        return $this->isRequired;
    }

    public function getLength(): ?int
    {
        return $this->length;
    }

    public function getMinLength(): ?int
    {
        return $this->minLength;
    }

    public function getMaxLength(): ?int
    {
        return $this->maxLength;
    }

    public function getIsPhone(): ?bool
    {
        return $this->isPhone;
    }

    public function getIsCnpj(): ?bool
    {
        return $this->isCnpj;
    }
}