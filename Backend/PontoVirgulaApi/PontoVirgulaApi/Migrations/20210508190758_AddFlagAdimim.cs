using Microsoft.EntityFrameworkCore.Migrations;

namespace PontoVirgulaApi.Migrations
{
    public partial class AddFlagAdimim : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ADMIN",
                table: "USUARIO",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ADMIN",
                table: "USUARIO");
        }
    }
}
