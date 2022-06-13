
using GamingTournamentPlatform.Application.Users.Queries.List;
using GamingTournamentPlatform.Application.Users.Queries.Read;
using GamingTournamentPlatform.Application.Users.Queries.TeamApplications;
using GamingTournamentPlatform.Application.Users.Queries.TournamentApplications;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace GamingTournamentPlatform.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await Mediator.Send(new ListUserQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] int id)
        {
            var result = await Mediator.Send(new ReadUserQuery { Id = id });
            return Ok(result);
        }

        [HttpGet("team/application")]
        public async Task<ActionResult> GetInventation()
        {
            var result = await Mediator.Send(new TeamApplicationQuery());
            return Ok(result);
        }

        [HttpGet("tournament/application")]
        public async Task<ActionResult> GetTournamentInventation()
        {
            var result = await Mediator.Send(new TournamentApplicationQuery());
            return Ok(result);
        }
    }
}
