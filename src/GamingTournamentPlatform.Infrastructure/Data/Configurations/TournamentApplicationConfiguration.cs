using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TournamentApplicationConfiguration : IEntityTypeConfiguration<TournamentApplication>
    {
        public void Configure(EntityTypeBuilder<TournamentApplication> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Message).IsRequired();
            builder.HasOne(x => x.RegistrationInfo).WithMany(x => x.TournamentApplications).HasForeignKey(x => x.RegistrationInfoId);
            builder.HasOne(x => x.User).WithMany(x => x.TournamentApplications).HasForeignKey(x => x.UserId);
            builder.HasOne(x => x.Team).WithMany(x => x.TournamentApplications).HasForeignKey(x => x.TeamId);
        }
    }
}
