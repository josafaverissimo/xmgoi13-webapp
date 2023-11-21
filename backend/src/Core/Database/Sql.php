<?php

namespace Src\Core\Database;

final class Sql
{
    private string $query;
    private string $lastQuery;
    private array $error;
    private \PDO $dbInstance;
    private \PDOStatement $statement;
    private array $valuesToBind;

    public function __construct()
    {
        $this->query = "";
        $this->dbInstance = Connect::getInstance();
        $this->valuesToBind = [];
    }

    public function query(string $query): Sql
    {
        $this->query = $query;

        return $this;
    }

    public function getQuery(): string
    {
        return trim($this->query);
    }

    public function getLastQuery(): string
    {
        return trim($this->lastQuery);
    }

    public function getError(): array
    {
        return $this->error ?? $this->dbInstance->errorInfo();
    }

    public function select(string $table, string $columns = "*"): Sql
    {
        $this->query .= "SELECT {$columns} FROM {$table}";

        return $this;
    }

    public function where(string $columnAndComparison, string $value, $operator = ""): Sql
    {
        if(strpos($this->query, " WHERE ") === false) {
            $this->query .= " WHERE ";
        }

        $operator = strtoupper($operator);
        $columnAndComparison = trim($columnAndComparison);
        $columnAndComparison .= strpos($columnAndComparison, " ") === false ? " =" : "";

        $column = explode(" ", $columnAndComparison)[0];
        $boundValue = ":{$column}";

        $this->valuesToBind[$boundValue] = $value;

        $this->query .= "{$columnAndComparison} {$boundValue} {$operator} ";

        return $this;
    }

    public function orderBy(string $orderBy): Sql
    {
        $this->query .= " ORDER BY {$orderBy}";

        return $this;
    }

    public function limit(string $limit): Sql
    {
        $this->query .= " LIMIT {$limit}";

        return $this;
    }

    public function delete(string $table): Sql
    {
        $this->query = "DELETE FROM {$table}";

        return $this;
    }

    public function insert($table, array $valuesByColumns): Sql
    {
        $columns = array_keys($valuesByColumns);
        $implodedColumns = implode(",", $columns);

        $boundColumns = array_map(fn($column) => ":{$column}", $columns);
        $implodedBoundColumns = implode(",", $boundColumns);

        $this->valuesToBind = array_combine($boundColumns, array_values($valuesByColumns));
        $this->query = "INSERT INTO {$table} ({$implodedColumns}) VALUES ({$implodedBoundColumns})";

        return $this;
    }

    public function execute(): bool
    {
        try {
            $this->statement = $this->dbInstance->prepare($this->getQuery());

            $success = $this->statement->execute($this->valuesToBind);
            $this->lastQuery = str_replace(
                array_keys($this->valuesToBind),
                array_values($this->valuesToBind),
                $this->query
            );
            $this->query = "";
        } catch(\PDOException $exception) {
            $this->error = $exception->errorInfo;
        }

        return $success ?? false;
    }

    public function fetch(string $class = "StdClass")
    {
        $this->statement->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, $class);
        return $this->statement->fetch();
    }

    public function fetchAll($class = "StdClass"): array
    {
        return $this->statement->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, $class);
    }

    public function affectedRows(): int
    {
        return $this->statement->rowCount();
    }

    public function lastInsertId(): int
    {
        return $this->dbInstance->lastInsertId();
    }
}