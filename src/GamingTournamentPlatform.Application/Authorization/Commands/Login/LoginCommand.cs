using GamingTournamentPlatform.Application.Common.Models;
using MediatR;

namespace GamingTournamentPlatform.Application.Authorization.Commands.Login
{
    public class LoginCommand : IRequest<TokenDTO>
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
