using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamingTournamentPlatform.Infrastructure.Migrations.ApplicationDb
{
    public partial class UpdatedCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllowOrganizeCompetitions",
                table: "TournamentCategories",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowOrganizeCompetitions",
                table: "TournamentCategories");
        }
    }
}
