using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GamingTournamentPlatform.Web.Configuration
{
    public class AuthOptions
    {
        public string Issuer { get; set; } = null!;
        public string Key { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public int Lifetime { get; set; }

        public SymmetricSecurityKey? GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
