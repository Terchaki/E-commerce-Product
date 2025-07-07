using System.Data;
using MySql.Data.MySqlClient;
using Microsoft.OpenApi.Models;
using ProdutoApi.Repositories;
using ProdutoApi.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔌 Conexão com MySQL via Dapper
builder.Services.AddScoped<IDbConnection>(_ =>
    new MySqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔁 Injeção de dependência
builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();
builder.Services.AddScoped<IDepartamentoRepository, DepartamentoRepository>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();

// 🚀 Controladores MVC
builder.Services.AddControllers();

// 🌍 CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 📘 Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Produto API",
        Version = "v1"
    });
});

var app = builder.Build();

// ⚙️ Middlewares
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Produto API v1");
        c.RoutePrefix = string.Empty; // Swagger acessível em http://localhost:5000/
    });
}

// 🛡 Segurança e CORS
// app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();

// 🗺️ Mapear rotas
app.MapControllers();

app.Run();
