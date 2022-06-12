using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Common.Interfaces
{
    public interface IUserService
    {
        Task<User> GetCurrentUserAsync();
        Task<bool> IsCurrentUserInRole(string roleName);
    }
}
