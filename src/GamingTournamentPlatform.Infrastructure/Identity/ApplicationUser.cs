using Microsoft.AspNetCore.Identity;

namespace GamingTournamentPlatform.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser<int>
    {
        public ICollection<ApplicationRole> Roles { get; set; } = new List<ApplicationRole>();
    }
}
