using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Common.Models;
using MediatR;

namespace GamingTournamentPlatform.Application.Authorization.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, TokenDTO>
    {
        private readonly IIdentityService _identityService;
        private readonly ITokenGenerator _tokenGenerator;

        public LoginCommandHandler(IIdentityService identityService, ITokenGenerator tokenGenerator)
        {
            _identityService = identityService;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<TokenDTO> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            if (!await _identityService.CheckUserPassword(request.UserName, request.Password))
                throw new ValidationException(new Dictionary<string, string[]> { ["Password"] = new string[] { "Invalid Password or Username" } });

            var claims = await _identityService.GetUserClaimsAsync(request.UserName);

            var token = _tokenGenerator.GenerateAccessToken(claims);

            return token;
        }
    }
}
