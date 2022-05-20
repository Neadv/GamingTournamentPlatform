using GamingTournamentPlatform.Application.Authorization.Commands.Login;
using GamingTournamentPlatform.Application.Authorization.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace GamingTournamentPlatform.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ApiControllerBase
    {
        public AuthorizationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody, Required] RegisterUserCommand command)
        {
            if (User?.Identity?.IsAuthenticated == false)
            {
                Console.WriteLine();
            }
            await Mediator.Send(command);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody, Required] LoginCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }
    }
}
