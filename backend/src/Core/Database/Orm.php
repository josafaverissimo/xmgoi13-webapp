<?php

namespace Src\Core\Database;

abstract class Orm
{
    protected \StdClass $row;

    public function __get(string $column)
    {
        return $this->row->$column;
    }

    public function __set(string $column, $value): void
    {
        $this->set($column, $value);
    }

    public function set(string $column, $value): void
    {
        $this->row->$column = $value;
    }

    public function getRow(...$columns): \StdClass
    {
        if(empty($columns)) {
            return $this->row;
        }

        return (object) array_reduce($columns,
            fn($columnsFiltered, $columnFiltered) =>
            [...$columnsFiltered, $columnFiltered => $this->row->$columnFiltered],
            []
        );
    }

    public function getRowExcept(...$columns): \StdClass
    {
        $filteredColumns = array_diff(array_keys((array) $this->row), (array) $columns);

        return $this->getRow(...$filteredColumns);
    }
}
