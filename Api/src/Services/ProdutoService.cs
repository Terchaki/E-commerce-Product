using ProdutoApi.Services;
using ProdutoApi.Repositories;

public class ProdutoService : IProdutoService
{
    private readonly IProdutoRepository _repo;
    public ProdutoService(IProdutoRepository repo) => _repo = repo;

    public Task<IEnumerable<Produto>> ListarAsync() => _repo.GetAllAsync();
    public Task<Produto?> ObterAsync(Guid id) => _repo.GetByIdAsync(id);
    public Task CriarAsync(Produto produto) => _repo.AddAsync(produto);
    public Task AtualizarAsync(Guid id, Produto produto)
    {
        produto.Id = id;
        return _repo.UpdateAsync(produto);
    }
    public Task ExcluirAsync(Guid id) => _repo.DeleteAsync(id);
}