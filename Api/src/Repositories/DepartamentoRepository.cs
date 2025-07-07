using System.Data;
using Dapper;
using ProdutoApi.Repositories;

public class DepartamentoRepository : IDepartamentoRepository
{
    private readonly IDbConnection _db;
    public DepartamentoRepository(IDbConnection db) => _db = db;

    public async Task<IEnumerable<Departamento>> GetAllAsync() =>
        await _db.QueryAsync<Departamento>("SELECT * FROM departamentos");
}