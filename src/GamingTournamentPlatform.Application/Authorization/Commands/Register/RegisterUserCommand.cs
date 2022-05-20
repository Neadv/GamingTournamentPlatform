using GamingTournamentPlatform.Application.Common.Security;
using MediatR;

namespace GamingTournamentPlatform.Application.Authorization.Commands.Register
{
    public class RegisterUserCommand : IRequest
    {
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
