using GamingTournamentPlatform.Application.Common.Models;
using System.Security.Claims;

namespace GamingTournamentPlatform.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<bool> IsUserInRole(int userId, string roleName);
        Task<bool> CheckUserPassword(string username, string password);
        Task<Result> CreateUserAsync(string username, string email, string password);
        Task<IEnumerable<Claim>> GetUserClaimsAsync(string username);
    }
}
