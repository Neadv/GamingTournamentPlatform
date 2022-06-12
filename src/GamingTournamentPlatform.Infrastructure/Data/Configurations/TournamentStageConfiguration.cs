using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TournamentStageConfiguration : IEntityTypeConfiguration<TournamentStage>
    {
        public void Configure(EntityTypeBuilder<TournamentStage> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
            builder.HasOne(x => x.Tournament).WithMany(x => x.Stages).HasForeignKey(x => x.TournamentId);
            builder.HasMany(x => x.TournamentTeamRounds).WithOne(x => x.TournamentStage).HasForeignKey(x => x.TournamentStageId).OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.TournamentUserRounds).WithOne(x => x.TournamentStage).HasForeignKey(x => x.TournamentStageId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
