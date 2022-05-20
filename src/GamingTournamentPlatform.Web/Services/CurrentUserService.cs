using GamingTournamentPlatform.Application.Common.Interfaces;
using System.Security.Claims;

namespace GamingTournamentPlatform.Web.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int? UserId
        {
            get
            {
                var id = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
                if (id != null && int.TryParse(id, out var userId))
                    return userId;
                return null;
            }
        }
    }
}
