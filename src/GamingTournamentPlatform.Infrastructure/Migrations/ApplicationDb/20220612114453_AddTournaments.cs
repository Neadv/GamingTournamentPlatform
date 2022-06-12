using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamingTournamentPlatform.Infrastructure.Migrations.ApplicationDb
{
    public partial class AddTournaments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tournament",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    State = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizerId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tournament", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tournament_AspNetUsers_OrganizerId",
                        column: x => x.OrganizerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tournament_TournamentCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "TournamentCategories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TeamTournament",
                columns: table => new
                {
                    TeamParticipantsId = table.Column<int>(type: "int", nullable: false),
                    TournamentsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamTournament", x => new { x.TeamParticipantsId, x.TournamentsId });
                    table.ForeignKey(
                        name: "FK_TeamTournament_Teams_TeamParticipantsId",
                        column: x => x.TeamParticipantsId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamTournament_Tournament_TournamentsId",
                        column: x => x.TournamentsId,
                        principalTable: "Tournament",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TournamentRegistrationInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TournamentId = table.Column<int>(type: "int", nullable: false),
                    RegistrationDeadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CountOfParticipants = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentRegistrationInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TournamentRegistrationInfo_Tournament_TournamentId",
                        column: x => x.TournamentId,
                        principalTable: "Tournament",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TournamentStage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TournamentId = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentStage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TournamentStage_Tournament_TournamentId",
                        column: x => x.TournamentId,
                        principalTable: "Tournament",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TournamentUser",
                columns: table => new
                {
                    TournamentsId = table.Column<int>(type: "int", nullable: false),
                    UserParticipantsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentUser", x => new { x.TournamentsId, x.UserParticipantsId });
                    table.ForeignKey(
                        name: "FK_TournamentUser_AspNetUsers_UserParticipantsId",
                        column: x => x.UserParticipantsId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TournamentUser_Tournament_TournamentsId",
                        column: x => x.TournamentsId,
                        principalTable: "Tournament",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TournamentApplication",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Inventation = table.Column<bool>(type: "bit", nullable: false),
                    RegistrationInfoId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    TeamId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentApplication", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TournamentApplication_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TournamentApplication_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TournamentApplication_TournamentRegistrationInfo_RegistrationInfoId",
                        column: x => x.RegistrationInfoId,
                        principalTable: "TournamentRegistrationInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TournamentTeamRound",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstParticipantId = table.Column<int>(type: "int", nullable: true),
                    SecondParticipantId = table.Column<int>(type: "int", nullable: true),
                    NextRoundId = table.Column<int>(type: "int", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: true),
                    TournamentStageId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YoutubeUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FirstParticipantWon = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentTeamRound", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TournamentTeamRound_Teams_FirstParticipantId",
                        column: x => x.FirstParticipantId,
                        principalTable: "Teams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TournamentTeamRound_Teams_SecondParticipantId",
                        column: x => x.SecondParticipantId,
                        principalTable: "Teams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TournamentTeamRound_TournamentStage_TournamentStageId",
                        column: x => x.TournamentStageId,
                        principalTable: "TournamentStage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TournamentTeamRound_TournamentTeamRound_NextRoundId",
                        column: x => x.NextRoundId,
                        principalTable: "TournamentTeamRound",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TournamentUserRound",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstParticipantId = table.Column<int>(type: "int", nullable: true),
                    SecondParticipantId = table.Column<int>(type: "int", nullable: true),
                    NextRoundId = table.Column<int>(type: "int", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: true),
                    TournamentStageId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YoutubeUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FirstParticipantWon = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentUserRound", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TournamentUserRound_AspNetUsers_FirstParticipantId",
                        column: x => x.FirstParticipantId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TournamentUserRound_AspNetUsers_SecondParticipantId",
                        column: x => x.SecondParticipantId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TournamentUserRound_TournamentStage_TournamentStageId",
                        column: x => x.TournamentStageId,
                        principalTable: "TournamentStage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TournamentUserRound_TournamentUserRound_NextRoundId",
                        column: x => x.NextRoundId,
                        principalTable: "TournamentUserRound",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TeamTournament_TournamentsId",
                table: "TeamTournament",
                column: "TournamentsId");

            migrationBuilder.CreateIndex(
                name: "IX_Tournament_CategoryId",
                table: "Tournament",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tournament_OrganizerId",
                table: "Tournament",
                column: "OrganizerId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentApplication_RegistrationInfoId",
                table: "TournamentApplication",
                column: "RegistrationInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentApplication_TeamId",
                table: "TournamentApplication",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentApplication_UserId",
                table: "TournamentApplication",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentRegistrationInfo_TournamentId",
                table: "TournamentRegistrationInfo",
                column: "TournamentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TournamentStage_TournamentId",
                table: "TournamentStage",
                column: "TournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentTeamRound_FirstParticipantId",
                table: "TournamentTeamRound",
                column: "FirstParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentTeamRound_NextRoundId",
                table: "TournamentTeamRound",
                column: "NextRoundId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentTeamRound_SecondParticipantId",
                table: "TournamentTeamRound",
                column: "SecondParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentTeamRound_TournamentStageId",
                table: "TournamentTeamRound",
                column: "TournamentStageId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentUser_UserParticipantsId",
                table: "TournamentUser",
                column: "UserParticipantsId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentUserRound_FirstParticipantId",
                table: "TournamentUserRound",
                column: "FirstParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentUserRound_NextRoundId",
                table: "TournamentUserRound",
                column: "NextRoundId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentUserRound_SecondParticipantId",
                table: "TournamentUserRound",
                column: "SecondParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentUserRound_TournamentStageId",
                table: "TournamentUserRound",
                column: "TournamentStageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeamTournament");

            migrationBuilder.DropTable(
                name: "TournamentApplication");

            migrationBuilder.DropTable(
                name: "TournamentTeamRound");

            migrationBuilder.DropTable(
                name: "TournamentUser");

            migrationBuilder.DropTable(
                name: "TournamentUserRound");

            migrationBuilder.DropTable(
                name: "TournamentRegistrationInfo");

            migrationBuilder.DropTable(
                name: "TournamentStage");

            migrationBuilder.DropTable(
                name: "Tournament");
        }
    }
}
