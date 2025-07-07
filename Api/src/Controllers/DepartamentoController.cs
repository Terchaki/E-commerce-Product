using Microsoft.AspNetCore.Mvc;
using ProdutoApi.Repositories;

[ApiController]
[Route("api/[controller]")]
public class DepartamentoController : ControllerBase
{
    private readonly IDepartamentoRepository _repo;
    public DepartamentoController(IDepartamentoRepository repo) => _repo = repo;

    [HttpGet] public async Task<IActionResult> Get() => Ok(await _repo.GetAllAsync());
}