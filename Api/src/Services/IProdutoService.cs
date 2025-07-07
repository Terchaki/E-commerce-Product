using ProdutoApi.Repositories;

namespace ProdutoApi.Services
{
    public interface IProdutoService
    {
        Task<IEnumerable<Produto>> ListarAsync();
        Task<Produto?> ObterAsync(Guid id);
        Task CriarAsync(Produto produto);
        Task AtualizarAsync(Guid id, Produto produto);
        Task ExcluirAsync(Guid id);
    }
}
