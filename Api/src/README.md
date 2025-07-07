# Backend - Produto API

API RESTful com .NET 6, MySQL e Dapper para gerenciamento de produtos.

## Tecnologias

- .NET 6
- Dapper
- MySQL

## 📂 Estrutura de Pastas do Projeto

```bash
src/
├── Controllers/
├── Models/
│   └── Produto.cs
│   └── Departamento.cs
├── Properties/
├── Repositories/
│   └── ProdutoRepository.cs
│   └── IDbConnectionFactory.cs
├── Program.cs
├── appsettings.json
└── ...
```


## ⚙️ Como Configurar o Projeto

### Pré-requisitos

Antes de iniciar, certifique-se de que você tem instalado:

- [.NET SDK 6.0+](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [MySQL Server](https://dev.mysql.com/downloads/)

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
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=produtos_db;User Id=root;Password=suasenha;"
  }
}
```

3. Instalar as Dependências

Na pasta src da Api abra o terminal e execute o seguinte comando:
```bash
dotnet restore
```

4. Execute a API:

```bash
dotnet run
```

<br>

A API estará disponível em `http://localhost:5000/swagger`.

## Lista de Endpoints
| Método | Rota               | Descrição                       |
| ------ | ------------------ | ------------------------------- |
| GET    | /api/produtos      | Lista todos os produtos         |
| GET    | /api/produtos/{id} | Busca um produto por ID         |
| POST   | /api/produtos      | Cadastra um novo produto        |
| PUT    | /api/produtos/{id} | Atualiza os dados de um produto |
| DELETE | /api/produtos/{id} | Remove um produto (soft delete) |
