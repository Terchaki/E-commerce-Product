using ProdutoApi.Repositories;

namespace ProdutoApi.Repositories
{
    public interface IDepartamentoRepository
    {
        Task<IEnumerable<Departamento>> GetAllAsync();
    }
}
