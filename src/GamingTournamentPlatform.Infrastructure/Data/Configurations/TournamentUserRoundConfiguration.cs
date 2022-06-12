using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TournamentUserRoundConfiguration : IEntityTypeConfiguration<TournamentUserRound>
    {
        public void Configure(EntityTypeBuilder<TournamentUserRound> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.TournamentStage).WithMany(x => x.TournamentUserRounds).HasForeignKey(x => x.TournamentStageId).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.Description).IsRequired();
            builder.Property(x => x.YoutubeUrl).HasMaxLength(500);
            builder.HasOne(x => x.FirstParticipant).WithMany().HasForeignKey(x => x.FirstParticipantId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.SecondParticipant).WithMany().HasForeignKey(x => x.SecondParticipantId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
