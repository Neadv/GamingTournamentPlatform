using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TeamConfiguration : IEntityTypeConfiguration<Team>
    {
        public void Configure(EntityTypeBuilder<Team> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
            builder.HasOne(x => x.Leader).WithMany(x => x.LeaderTeams).HasForeignKey(x => x.LeaderId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Category).WithMany(x => x.Teams).HasForeignKey(x => x.CategoryId);
            builder.HasMany(x => x.Participants).WithMany(x => x.Teams);
            builder.HasMany(x => x.Applications).WithOne(x => x.Team).HasForeignKey(x => x.TeamId);
        }
    }
}
