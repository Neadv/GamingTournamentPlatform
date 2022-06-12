using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamingTournamentPlatform.Infrastructure.Migrations.ApplicationDb
{
    public partial class UpdateTournaments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamTournament_Tournament_TournamentsId",
                table: "TeamTournament");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournament_AspNetUsers_OrganizerId",
                table: "Tournament");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournament_TournamentCategories_CategoryId",
                table: "Tournament");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentRegistrationInfo_Tournament_TournamentId",
                table: "TournamentRegistrationInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentStage_Tournament_TournamentId",
                table: "TournamentStage");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentUser_Tournament_TournamentsId",
                table: "TournamentUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tournament",
                table: "Tournament");

            migrationBuilder.RenameTable(
                name: "Tournament",
                newName: "Tournaments");

            migrationBuilder.RenameIndex(
                name: "IX_Tournament_OrganizerId",
                table: "Tournaments",
                newName: "IX_Tournaments_OrganizerId");

            migrationBuilder.RenameIndex(
                name: "IX_Tournament_CategoryId",
                table: "Tournaments",
                newName: "IX_Tournaments_CategoryId");

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "TournamentUserRound",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "TournamentTeamRound",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tournaments",
                table: "Tournaments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamTournament_Tournaments_TournamentsId",
                table: "TeamTournament",
                column: "TournamentsId",
                principalTable: "Tournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentRegistrationInfo_Tournaments_TournamentId",
                table: "TournamentRegistrationInfo",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_AspNetUsers_OrganizerId",
                table: "Tournaments",
                column: "OrganizerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_TournamentCategories_CategoryId",
                table: "Tournaments",
                column: "CategoryId",
                principalTable: "TournamentCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentStage_Tournaments_TournamentId",
                table: "TournamentStage",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentUser_Tournaments_TournamentsId",
                table: "TournamentUser",
                column: "TournamentsId",
                principalTable: "Tournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamTournament_Tournaments_TournamentsId",
                table: "TeamTournament");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentRegistrationInfo_Tournaments_TournamentId",
                table: "TournamentRegistrationInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_AspNetUsers_OrganizerId",
                table: "Tournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_TournamentCategories_CategoryId",
                table: "Tournaments");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentStage_Tournaments_TournamentId",
                table: "TournamentStage");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentUser_Tournaments_TournamentsId",
                table: "TournamentUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tournaments",
                table: "Tournaments");

            migrationBuilder.DropColumn(
                name: "State",
                table: "TournamentUserRound");

            migrationBuilder.DropColumn(
                name: "State",
                table: "TournamentTeamRound");

            migrationBuilder.RenameTable(
                name: "Tournaments",
                newName: "Tournament");

            migrationBuilder.RenameIndex(
                name: "IX_Tournaments_OrganizerId",
                table: "Tournament",
                newName: "IX_Tournament_OrganizerId");

            migrationBuilder.RenameIndex(
                name: "IX_Tournaments_CategoryId",
                table: "Tournament",
                newName: "IX_Tournament_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tournament",
                table: "Tournament",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamTournament_Tournament_TournamentsId",
                table: "TeamTournament",
                column: "TournamentsId",
                principalTable: "Tournament",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournament_AspNetUsers_OrganizerId",
                table: "Tournament",
                column: "OrganizerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournament_TournamentCategories_CategoryId",
                table: "Tournament",
                column: "CategoryId",
                principalTable: "TournamentCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentRegistrationInfo_Tournament_TournamentId",
                table: "TournamentRegistrationInfo",
                column: "TournamentId",
                principalTable: "Tournament",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentStage_Tournament_TournamentId",
                table: "TournamentStage",
                column: "TournamentId",
                principalTable: "Tournament",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentUser_Tournament_TournamentsId",
                table: "TournamentUser",
                column: "TournamentsId",
                principalTable: "Tournament",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
