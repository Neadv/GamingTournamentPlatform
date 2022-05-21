using GamingTournamentPlatform.Domain.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GamingTournamentPlatform.Infrastructure.Data.Configurations
{
    public class TournamentCategoryConfiguration : IEntityTypeConfiguration<TournamentCategory>
    {
        public void Configure(EntityTypeBuilder<TournamentCategory> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
            builder.HasOne(x => x.Parent).WithMany(x => x.Children).HasForeignKey(x => x.ParentId);
            builder.HasMany(x => x.Teams).WithOne(x => x.Category).HasForeignKey(x => x.CategoryId);
        }
    }
}
