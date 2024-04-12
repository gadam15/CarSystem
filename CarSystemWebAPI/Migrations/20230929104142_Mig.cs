using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarSystemWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Mig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Year",
                table: "Cars",
                newName: "Rok");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cars",
                newName: "Model");

            migrationBuilder.AddColumn<string>(
                name: "Marka",
                table: "Cars",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Marka",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "Rok",
                table: "Cars",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Cars",
                newName: "Name");
        }
    }
}
