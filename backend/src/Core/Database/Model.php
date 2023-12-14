<?php

namespace Src\Core\Database;
use Src\Interfaces\Database\IModel;

abstract class Model
{
    protected Sql $sql;
    protected string $table;
    protected ?Orm $orm;

    public function __construct(string $table, ?Orm $orm = null)
    {
        $this->sql = new Sql();
        $this->table = $table;
        $this->orm = $orm;
    }

    public function getTable(): string
    {
        return $this->table;
    }

    public function getSql(): Sql
    {
        return new Sql();
    }

    public function getCurrentQuery(): string
    {
        return $this->sql->getQuery();
    }

    public function getLastQuery(): string
    {
        return $this->sql->getLastQuery();
    }

    public function getError(): array
    {
        return $this->sql->getError();
    }

    public function isError(): bool
    {
        return !empty($this->getError()[2]);
    }

    public function getAll(array $options = [], string $columns = ''): array
    {
        if(!empty($columns)) {
            $this->sql->select($this->table, $columns);
        } else {
            $this->sql->select($this->table);
        }

        if(!empty($options)) {
            if(!empty($options["where"])) {
                if(!empty($options["multipleWhere"])) {
                    foreach($options["where"] as $where) {
                        $comparison = $where["comparison"];
                        $value = $where["value"];
                        $operator = $where["operator"] ?? "";
                        $this->sql->where($comparison, $value, $operator);
                    }
                } else {
                    $comparison = $options["where"]["comparison"];
                    $value = $options["where"]["value"];
                    $operator = $options["where"]["operator"] ?? "";
                    $this->sql->where($comparison, $value, $operator);
                }
            }

            if(!empty($options["orderBy"])) {
                $this->sql->orderBy($options["orderBy"]);
            }

            if(!empty($options["limit"])) {
                $this->sql->limit($options["limit"]);
            }
        }
        $this->sql->execute();

        $class = $this->orm ? get_class($this->orm) : "StdClass";
        return $this->sql->fetchAll($class);
    }

    public function getTotalRows(array $options = []): int
    {
        unset($options['limit']);
        return $this->getAll($options, 'count(*) as total')[0]->total;
    }

    public function getBy(string $columnAndComparison, string $value): ?Orm
    {
        $where = [
            "comparison" => $columnAndComparison,
            "value" => $value
        ];
        $rows = $this->getAll([
            "where" => $where
        ]);

        return count($rows) === 0 ? null : $rows[0];
    }

    public function push(array $valuesByColumns): int
    {
        $this->sql->insert($this->table, $valuesByColumns)->execute();

        return $this->sql->lastInsertId();
    }

    public function update(array $set, array $where): int
    {
        $this->sql->update($this->table, $set)
            ->where($where["column"], $where["value"])
            ->execute();

        return $this->sql->affectedRows();
    }

    public function delete(): int
    {
        $this->sql->delete($this->table)->execute();

        return $this->sql->affectedRows();
    }

    public function truncate(): void
    {
        $this->delete();

        if(!$this->isError()) {
            $this->getSql()->query("ALTER TABLE " . $this->getTable() . " AUTO_INCREMENT = 1")->execute();
        }
    }
}