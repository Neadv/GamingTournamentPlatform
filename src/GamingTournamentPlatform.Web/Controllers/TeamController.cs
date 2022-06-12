using GamingTournamentPlatform.Application.Teams.Commands.Create;
using GamingTournamentPlatform.Application.Teams.Commands.Delete;
using GamingTournamentPlatform.Application.Teams.Commands.Invite;
using GamingTournamentPlatform.Application.Teams.Commands.Update;
using GamingTournamentPlatform.Application.Teams.Queries.Category;
using GamingTournamentPlatform.Application.Teams.Queries.List;
using GamingTournamentPlatform.Application.Teams.Queries.Read;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace GamingTournamentPlatform.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ApiControllerBase
    {
        public TeamController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await Mediator.Send(new ListTeamQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] int id)
        {
            var result = await Mediator.Send(new ReadTeamQuery { Id = id });
            return Ok(result);
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult> GetByCategoryId([FromRoute] int categoryId)
        {
            var result = await Mediator.Send(new CategoryTeamQuery { CategoryId = categoryId });
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateTeamCommand createTeamCommand)
        {
            var result = await Mediator.Send(createTeamCommand);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute] int id, [FromBody] UpdateTeamCommand updateTeamCommand)
        {
            if (id != updateTeamCommand.Id)
                return BadRequest();

            var result = await Mediator.Send(updateTeamCommand);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var result = await Mediator.Send(new DeleteTeamCommand { Id = id });
            return Ok();
        }

        [HttpPost("invite")]
        public async Task<ActionResult> Invite([FromBody] InviteTeamCommand inviteTeamCommand)
        {
            var result = await Mediator.Send(inviteTeamCommand);
            return Ok();
        }
    }
}
