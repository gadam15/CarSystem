using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarSystemWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddUserID_and_LicznikColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Licznik",
                table: "Cars",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Licznik",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Cars");
        }
    }
}
