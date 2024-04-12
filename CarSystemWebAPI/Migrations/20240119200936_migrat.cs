using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarSystemWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Cars",
                newName: "UserIDId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_UserIDId",
                table: "Cars",
                column: "UserIDId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Users_UserIDId",
                table: "Cars",
                column: "UserIDId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Users_UserIDId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_UserIDId",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "UserIDId",
                table: "Cars",
                newName: "UserID");
        }
    }
}
