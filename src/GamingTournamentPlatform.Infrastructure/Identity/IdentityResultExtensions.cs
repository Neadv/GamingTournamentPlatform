using GamingTournamentPlatform.Application.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace GamingTournamentPlatform.Infrastructure.Identity
{
    public static class IdentityResultExtensions
    {
        public static Result ToApplicationResult(this IdentityResult result)
        {
            return result.Succeeded
                ? Result.Success()
                : new Result(result.Errors.GroupBy(e => e.Code, e => e.Description).ToDictionary(e => e.Key, e => e.ToArray()));
        }
    }
}
