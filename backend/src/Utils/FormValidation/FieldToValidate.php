<?php

namespace Src\Utils\FormValidation;

class FieldToValidate
{
    private string $name;
    private string $value;
    private FieldToValidateOptions $options;

    public function __construct(string $name, string $options = '') {
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
        $isRequired = $this->options->getOption('required');

        return $isRequired ?? false;
    }

    public function validateLength(): bool
    {

        $optionLength = $this->options->getOption('length');

        if(!empty($optionLength)) {
            return mb_strlen($this->value) === $optionLength;
        }

        return true;
    }

    public function validateMinLength(): bool
    {
        $optionMinLength = $this->options->getOption('minLength');

        if(!empty($optionMinLength)) {
            return $optionMinLength <= mb_strlen($this->value);
        }

        return true;
    }

    public function validateMaxLength(): bool
    {
        $optionMaxLength = $this->options->getOption('maxLength');

        if(!empty($optionMaxLength)) {
            return $optionMaxLength >= mb_strlen($this->value);
        }

        return true;
    }

    public function validateEmail(): bool
    {
        $optionIsEmail = $this->options->getOption('isEmail');

        if(!empty($optionIsEmail)) {
            return filter_var($this->value, FILTER_VALIDATE_EMAIL) !== false;
        }

        return true;
    }

    public function getOptionValue($option) {
        return $this->options->getOption($option);
    }
}