using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options => options.AddPolicy
("Acesso Total", configs => configs
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod()) 
);

var app = builder.Build();

app.MapGet("/", () => "Juliano");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5000/api/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id, [FromBody] Tarefa tarefaAtualizada) =>
{
    var tarefa = ctx.Tarefas.FirstOrDefault(t => t.TarefaId == id);
    
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    // Atualizar Titulo se fornecido
    if (!string.IsNullOrEmpty(tarefaAtualizada.Titulo))
    {
        tarefa.Titulo = tarefaAtualizada.Titulo;
    }
    
    // Lógica de transição de status
    if (tarefa.Status == "Não iniciada")
    {
        if (tarefaAtualizada.Status == "Em andamento")
        {
            tarefa.Status = "Em andamento";
        }
        else
        {
            return Results.BadRequest("Deu ruim aqui parceiro");
        }
    }
    else if (tarefa.Status == "Em andamento")
    {
        if (tarefaAtualizada.Status == "Concluída")
        {
            tarefa.Status = "Concluída";
        }
        else
        {
            return Results.BadRequest("Deu ruim aqui parceiro");
        }
    }
    else
    {
        return Results.BadRequest("Status inválido");
    }

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

//PATCH: http://localhost:5000/api/tarefa/alterar
app.MapPatch("/api/tarefa/alterar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    var tarefaExistente = ctx.Tarefas.FirstOrDefault(t => t.TarefaId == tarefa.TarefaId);
    
    if (tarefaExistente == null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    // Lógica de transição de status automática
    if (tarefaExistente.Status == "Não iniciada")
    {
        tarefaExistente.Status = "Em andamento";
    }
    else if (tarefaExistente.Status == "Em andamento")
    {
        tarefaExistente.Status = "Concluída";
    }

    ctx.Tarefas.Update(tarefaExistente);
    ctx.SaveChanges();
    return Results.Ok(tarefaExistente);
});

//GET: http://localhost:5000/api/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasNaoConcluidas = ctx.Tarefas.Where(t => t.Status != "Concluída").ToList();
    
    if (tarefasNaoConcluidas.Any())
    {
        return Results.Ok(tarefasNaoConcluidas);
    }
    return Results.NotFound("Nenhuma tarefa não concluída encontrada");
});

//GET: http://localhost:5000/api/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasConcluidas = ctx.Tarefas.Where(t => t.Status == "Concluída").ToList();
    
    if (tarefasConcluidas.Any())
    {
        return Results.Ok(tarefasConcluidas);
    }
    return Results.NotFound("Nenhuma tarefa concluída encontrada");
});

app.UseCors("Acesso Total");
app.Run();
