using GamingTournamentPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("AspNetUsers");
            builder.ToTable(b => b.ExcludeFromMigrations());

            builder.HasKey(x => x.Id);

            builder.HasMany(x => x.TeamApplications).WithOne(x => x.User).HasForeignKey(x => x.UserId);
            builder.HasMany(x => x.LeaderTeams).WithOne(x => x.Leader).HasForeignKey(x => x.LeaderId).OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.Teams).WithMany(x => x.Participants);
        }
    }
}
