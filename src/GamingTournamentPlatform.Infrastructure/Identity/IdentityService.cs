using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Common.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace GamingTournamentPlatform.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> CheckUserPassword(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            return user == null ? false : await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<Result> CreateUserAsync(string username, string email, string password)
        {
            var user = new ApplicationUser
            {
                UserName = username,
                Email = email
            };

            var result = await _userManager.CreateAsync(user, password);

            return result.ToApplicationResult();
        }

        public async Task<IEnumerable<Claim>> GetUserClaimsAsync(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            IList<Claim> claims = await _userManager.GetClaimsAsync(user);
            IList<string> roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.Email, user.Email));

            return claims;
        }

        public async Task<bool> IsUserInRole(int userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            return user != null
                ? await _userManager.IsInRoleAsync(user, roleName)
                : false;
        }
    }
}
