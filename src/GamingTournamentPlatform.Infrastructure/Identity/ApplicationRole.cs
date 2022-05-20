using Microsoft.AspNetCore.Identity;

namespace GamingTournamentPlatform.Infrastructure.Identity
{
    public class ApplicationRole: IdentityRole<int>
    {
        public ICollection<ApplicationUser> ApplicationUsers { get; set; } = new List<ApplicationUser>();
    }
}
