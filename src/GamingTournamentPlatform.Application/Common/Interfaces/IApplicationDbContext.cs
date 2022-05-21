using GamingTournamentPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<TournamentCategory> TournamentCategories { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamUserApplication> TeamUserApplications { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
