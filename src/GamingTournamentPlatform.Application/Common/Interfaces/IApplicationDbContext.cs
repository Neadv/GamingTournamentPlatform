using GamingTournamentPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<User> Users { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
