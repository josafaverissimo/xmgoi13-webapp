<?php

namespace Src\Utils;

class FileUpload
{
    public function uploadFile(array $file, string $filename = null): bool {
        $filename ??= $file['name'];
        $targetFile = CONF_UPLOAD_DIR . "/{$filename}";

        return move_uploaded_file($file['tmp_name'], $targetFile);
    }

}