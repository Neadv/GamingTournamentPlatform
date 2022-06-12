using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TournamentRegistrationInfoConfiguration : IEntityTypeConfiguration<TournamentRegistrationInfo>
    {
        public void Configure(EntityTypeBuilder<TournamentRegistrationInfo> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Tournament).WithOne(x => x.RegistrationInfo).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(x => x.TournamentApplications).WithOne(x => x.RegistrationInfo).HasForeignKey(x => x.RegistrationInfoId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
