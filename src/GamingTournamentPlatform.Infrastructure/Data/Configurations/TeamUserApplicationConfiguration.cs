using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TeamUserApplicationConfiguration : IEntityTypeConfiguration<TeamUserApplication>
    {
        public void Configure(EntityTypeBuilder<TeamUserApplication> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.User).WithMany(x => x.TeamApplications).HasForeignKey(x => x.UserId);
            builder.HasOne(x => x.Team).WithMany(x => x.Applications).HasForeignKey(x => x.TeamId);
        }
    }
}
