using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tarefas",
                columns: table => new
                {
                    TarefaId = table.Column<string>(type: "TEXT", nullable: false),
                    Titulo = table.Column<string>(type: "TEXT", nullable: true),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tarefas", x => x.TarefaId);
                });

            migrationBuilder.InsertData(
                table: "Tarefas",
                columns: new[] { "TarefaId", "CriadoEm", "Status", "Titulo" },
                values: new object[,]
                {
                    { "2f1b7dc1-3b9a-4e1a-a389-7f5d2f1c8f3e", new DateTime(2025, 11, 17, 9, 7, 8, 270, DateTimeKind.Local).AddTicks(9337), "Não iniciada", "Estudar Angular" },
                    { "6a8b3e4d-5e4e-4f7e-bdc9-9181e456ad0e", new DateTime(2025, 11, 21, 9, 7, 8, 270, DateTimeKind.Local).AddTicks(9327), "Não iniciada", "Concluir relatório" },
                    { "e5d4a7b9-1f9e-4c4a-ae3b-5b7c1a9d2e3f", new DateTime(2025, 11, 28, 9, 7, 8, 270, DateTimeKind.Local).AddTicks(9342), "Não iniciada", "Passeio no parque" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tarefas");
        }
    }
}
