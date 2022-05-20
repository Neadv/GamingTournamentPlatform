using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        public int? UserId { get; }
        public bool IsAuthorized { get; }
        bool IsInRole(string roleName);
    }
}
