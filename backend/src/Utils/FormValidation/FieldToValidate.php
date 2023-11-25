<?php

namespace Src\Utils\FormValidation;

class FieldToValidate
{
    private string $name;
    private string $value;
    private FieldToValidateOptions $options;

    public function __construct(string $name, string $options) {
        $this->name = $name;
        $this->options = new FieldToValidateOptions($options);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setValue(string $value): void
    {
        $this->value = $value;
    }

    public function isRequired(): bool
    {
        return empty($this->options->getIsRequired());
    }

    public function checkLength(): bool
    {
        $optionLength = $this->options->getLength();

        if(!empty($optionLength)) {
            return mb_strlen($this->value) === $optionLength;
        }

        return true;
    }

    public function checkMinLength(): bool
    {
        $optionMinLength = $this->options->getMinLength();

        if(!empty($optionMinLength)) {
            return mb_strlen($this->value) <= $optionMinLength;
        }

        return true;
    }

    public function checkMaxLength(): bool
    {
        $optionMaxLength = $this->options->getMinLength();

        if(!empty($optionMaxLength)) {
            return mb_strlen($this->value) >= $optionMaxLength;
        }

        return true;
    }

    public function isPhone(): bool
    {
        if(!empty($this->options->getIsPhone())) {
            
        }
    }
}