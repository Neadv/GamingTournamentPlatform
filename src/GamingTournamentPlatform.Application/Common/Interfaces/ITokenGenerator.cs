using GamingTournamentPlatform.Application.Common.Models;
using System.Security.Claims;

namespace GamingTournamentPlatform.Application.Common.Interfaces
{
    public interface ITokenGenerator
    {
        TokenDTO GenerateAccessToken(IEnumerable<Claim> claims);
    }
}
