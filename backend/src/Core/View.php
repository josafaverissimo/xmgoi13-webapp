<?php

namespace Src\Core;

use Src\Utils\Helpers;
use Src\Utils\Session;

class View
{
    private array $template;
    private array $sections;
    private Session $session;

    public function __construct()
    {
        $this->sections = [];
        $this->session = Session::getInstance();
    }

    private function getViewPath(string $viewPath): string
    {
        return Helpers::baseViewPath($viewPath) . ".php";
    }

    private function checkIfScriptOrCssIsInPage(string $scriptOrCss): bool
    {
        $checkIfIsScriptOrCssRegex = '#^<link.*rel=[\'"]stylesheet[\'"]|^<script.*</script>$#i';

        return preg_match($checkIfIsScriptOrCssRegex, $scriptOrCss);
    }

    public function template(string $templatePath, ?array $data = []): void
    {
        $this->template = [
            "path" => "templates/{$templatePath}",
            "data" => $data
        ];
    }

    public function getViewHtml(string $viewPath, array $data = []): string
    {
        $viewPath = $this->getViewPath($viewPath);
        ob_start();

        extract($data);

        require $viewPath;

        return ob_get_clean();
    }

    public function render(string $viewPath, array $data = []): void
    {
        $viewHtml = $this->getViewHtml($viewPath, $data);

        if(isset($this->template)) {
            $templateHtml = $this->getViewHtml($this->template["path"], array_merge(
                ["viewHtml" => $viewHtml],
                $this->template["data"]
            ));

            echo Helpers::minify($templateHtml);
            unset($this->template);
            return;
        }

        echo Helpers::minify($viewHtml);
    }

    public function setSection(string $name): void
    {
        $this->sections[$name] = $this->sections[$name] ?? [];

        ob_start();
    }

    public function endSection(string $name): void
    {
        $output = trim(ob_get_clean());

        if($this->checkIfScriptOrCssIsInPage($output) && in_array($output, $this->sections[$name])) {
            return;
        }

        $this->sections[$name][] = $output;
    }

    public function getSection(string $name): string
    {
        if (isset($this->sections[$name])) {
            return implode($this->sections[$name]);
        }

        return "";
    }
}