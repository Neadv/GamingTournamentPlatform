using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Common.Models;
using GamingTournamentPlatform.Web.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GamingTournamentPlatform.Web.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly AuthOptions _authOptions;

        public TokenGenerator(AuthOptions authOptions)
        {
            _authOptions = authOptions;
        }

        public TokenDTO GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var credentials = new SigningCredentials(_authOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Audience = _authOptions.Audience,
                Issuer = _authOptions.Issuer,
                Expires = DateTime.Now.AddMinutes(_authOptions.Lifetime),
                SigningCredentials = credentials,
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new TokenDTO(tokenHandler.WriteToken(token), _authOptions.Lifetime);
        }
    }
}
