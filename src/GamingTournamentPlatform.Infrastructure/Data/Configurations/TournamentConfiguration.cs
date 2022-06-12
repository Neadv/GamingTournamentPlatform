using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TournamentConfiguration : IEntityTypeConfiguration<Tournament>
    {
        public void Configure(EntityTypeBuilder<Tournament> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).HasMaxLength(256).IsRequired();
            builder.Property(x => x.Description).IsRequired();
            builder.Ignore(x => x.IsTeamTournament);
            builder.HasOne(x => x.Organizer).WithMany().HasForeignKey(x => x.OrganizerId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Category).WithMany().HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.RegistrationInfo).WithOne(x => x.Tournament);
            builder.HasMany(x => x.Stages).WithOne(x => x.Tournament).HasForeignKey(x => x.TournamentId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(x => x.TeamParticipants).WithMany(x => x.Tournaments);
            builder.HasMany(x => x.UserParticipants).WithMany(x => x.Tournaments);
        }
    }
}
