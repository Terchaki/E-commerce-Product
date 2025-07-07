using Microsoft.AspNetCore.Mvc;
using ProdutoApi.Services;
using ProdutoApi.Repositories;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly IProdutoService _service;
    public ProdutoController(IProdutoService service) => _service = service;

    [HttpGet] public async Task<IActionResult> Get() => Ok(await _service.ListarAsync());
    [HttpGet("{id}")] public async Task<IActionResult> Get(Guid id)
        => await _service.ObterAsync(id) is Produto p ? Ok(p) : NotFound();
    [HttpPost] public async Task<IActionResult> Post([FromBody] Produto produto)
    {
        await _service.CriarAsync(produto);
        return Created($"api/produto/{produto.Id}", produto);
    }
    [HttpPut("{id}")] public async Task<IActionResult> Put(Guid id, [FromBody] Produto produto)
    {
        await _service.AtualizarAsync(id, produto);
        return Ok(produto);
    }
    [HttpDelete("{id}")] public async Task<IActionResult> Delete(Guid id)
    {
        await _service.ExcluirAsync(id);
        return NoContent();
    }
}