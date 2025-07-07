using System.Data;
using Dapper;
using ProdutoApi.Repositories;

public class ProdutoRepository : IProdutoRepository
{
    private readonly IDbConnection _db;
    public ProdutoRepository(IDbConnection db) => _db = db;

    public async Task<IEnumerable<Produto>> GetAllAsync() =>
    await _db.QueryAsync<Produto>(@"
        SELECT 
            id,
            codigo,
            descricao,
            departamento_codigo AS DepartamentoCodigo,
            preco,
            status,
            excluido
        FROM produtos
        WHERE excluido = false");


   public async Task<Produto?> GetByIdAsync(Guid id) =>
    await _db.QueryFirstOrDefaultAsync<Produto>(@"
        SELECT 
            id,
            codigo,
            descricao,
            departamento_codigo AS DepartamentoCodigo,
            preco,
            status,
            excluido
        FROM produtos
        WHERE id = @Id AND excluido = false", new { Id = id });


    public async Task AddAsync(Produto produto)
    {
        produto.Id = Guid.NewGuid();
        const string sql = @"INSERT INTO produtos (id, codigo, descricao, departamento_codigo, preco, status, excluido)
                            VALUES (@Id, @Codigo, @Descricao, @DepartamentoCodigo, @Preco, @Status, false)";
        await _db.ExecuteAsync(sql, produto);
    }

    public async Task UpdateAsync(Produto produto)
    {
        const string sql = @"UPDATE produtos SET codigo = @Codigo, descricao = @Descricao,
                            departamento_codigo = @DepartamentoCodigo, preco = @Preco, status = @Status
                            WHERE id = @Id";
        await _db.ExecuteAsync(sql, produto);
    }

    public async Task DeleteAsync(Guid id) =>
        await _db.ExecuteAsync("UPDATE produtos SET excluido = true WHERE id = @Id", new { Id = id });
}