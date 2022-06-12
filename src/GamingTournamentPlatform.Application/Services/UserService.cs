using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;

        public UserService(IApplicationDbContext context, ICurrentUserService currentUserService, IIdentityService identityService)
        {
            _context = context;
            _currentUserService = currentUserService;
            _identityService = identityService;
        }

        public async Task<User> GetCurrentUserAsync()
        {
            return await _context.Users.FindAsync(_currentUserService.UserId) ?? throw new InvalidOperationException("User is not authorized");
        }

        public async Task<bool> IsCurrentUserInRole(string roleName)
        {
            return _currentUserService.UserId == null
                ? throw new InvalidOperationException("User is not authorized")
                : await _identityService.IsUserInRole(_currentUserService.UserId.Value, roleName);
        }
    }
}
