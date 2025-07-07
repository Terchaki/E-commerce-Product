# Backend - Produto API

API RESTful com .NET 6, MySQL e Dapper para gerenciamento de produtos.

## Tecnologias

- .NET 6
- Dapper
- MySQL

## Configuração

1. Configure seu banco MySQL e execute os scripts SQL:

```sql
CREATE DATABASE produtos_db;

USE produtos_db;

CREATE TABLE departamentos (
  codigo VARCHAR(3) PRIMARY KEY,
  descricao TEXT NOT NULL
);

INSERT INTO departamentos (codigo, descricao) VALUES
('010', 'BEBIDAS'),
('020', 'CONGELADOS'),
('030', 'LATICINIOS'),
('040', 'VEGETAIS');

CREATE TABLE produtos (
  id CHAR(36) PRIMARY KEY,
  codigo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  departamento_codigo VARCHAR(3),
  preco DECIMAL(10,2) NOT NULL,
  status BOOLEAN NOT NULL,
  excluido BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (departamento_codigo) REFERENCES departamentos(codigo)
);
```

2. Ajuste a connection string no `appsettings.json`.

3. Execute a API:

```bash
dotnet restore
dotnet run
```

A API estará disponível em `http://localhost:5000/swagger`.