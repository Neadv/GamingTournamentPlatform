using GamingTournamentPlatform.Application.Tournaments.Commands.AcceptApplication;
using GamingTournamentPlatform.Application.Tournaments.Commands.Create;
using GamingTournamentPlatform.Application.Tournaments.Commands.Finish;
using GamingTournamentPlatform.Application.Tournaments.Commands.FinishRegistration;
using GamingTournamentPlatform.Application.Tournaments.Commands.FinishRound;
using GamingTournamentPlatform.Application.Tournaments.Commands.Invite;
using GamingTournamentPlatform.Application.Tournaments.Commands.SetRegistration;
using GamingTournamentPlatform.Application.Tournaments.Commands.Start;
using GamingTournamentPlatform.Application.Tournaments.Commands.StartRound;
using GamingTournamentPlatform.Application.Tournaments.Commands.Update;
using GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRegistration;
using GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRound;
using GamingTournamentPlatform.Application.Tournaments.Queries.Applications;
using GamingTournamentPlatform.Application.Tournaments.Queries.Details;
using GamingTournamentPlatform.Application.Tournaments.Queries.List;
using GamingTournamentPlatform.Application.Tournaments.Queries.Read;
using GamingTournamentPlatform.Application.Tournaments.Queries.ReadRound;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace GamingTournamentPlatform.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentController : ApiControllerBase
    {
        public TournamentController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateTournamentCommand createTournamentCommand)
        {
            var result = await Mediator.Send(createTournamentCommand);
            return Ok(result);
        }

        [HttpGet("{id}/details")]
        public async Task<ActionResult> GetDetailsById([FromRoute] int id)
        {
            var result = await Mediator.Send(new DetailsTournamentQuery { Id = id });
            return result != null ? Ok(result) : Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] int id)
        {
            var result = await Mediator.Send(new ReadTournamentQuery { Id = id });
            return result != null ? Ok(result) : Ok();
        }

        [HttpGet()]
        public async Task<ActionResult> GetAll()
        {
            var result = await Mediator.Send(new ListTournamentQuery());
            return result != null ? Ok(result) : Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute] int id, [FromBody] UpdateTournamentCommand updateTournamentCommand)
        {
            if (updateTournamentCommand.Id != id)
                return BadRequest();
            await Mediator.Send(updateTournamentCommand);
            return Ok();
        }

        [HttpPut("{id}/register")]
        public async Task<ActionResult> UpdateRegistration([FromRoute] int id, [FromBody] UpdateRegistrationCommand updateRegistrationCommand)
        {
            if (updateRegistrationCommand.TournamentId != id)
                return BadRequest();

            await Mediator.Send(updateRegistrationCommand);
            return Ok();
        }

        [HttpPost("{id}/register/finish")]
        public async Task<ActionResult> FinishRegistration([FromRoute] int id)
        {
            await Mediator.Send(new FinishRegistrationCommand { Id = id });
            return Ok();
        }

        [HttpPost("invite")]
        public async Task<ActionResult> Invite([FromBody] InviteTournamentCommand inviteTournamentCommand)
        {
            await Mediator.Send(inviteTournamentCommand);
            return Ok();
        }

        [HttpPost("{id}/register")]
        public async Task<ActionResult> SetRegistration([FromRoute] int id)
        {
            await Mediator.Send(new SetRegistrationCommand { Id = id });
            return Ok();
        }

        [HttpPost("{id}/start")]
        public async Task<ActionResult> SetStart([FromRoute] int id)
        {
            await Mediator.Send(new StartTournamentCommand { Id = id });
            return Ok();
        }

        [HttpPost("{id}/finish")]
        public async Task<ActionResult> SetFinish([FromRoute] int id)
        {
            await Mediator.Send(new FinishTournamentCommand { Id = id });
            return Ok();
        }

        [HttpPost("{id}/round/{roundId}/start")]
        public async Task<ActionResult> SetStartRound([FromRoute] int id, [FromRoute] int roundId)
        {
            await Mediator.Send(new StartRoundCommand { TournamentId = id, RoundId = roundId });
            return Ok();
        }

        [HttpPost("{id}/round/{roundId}/finish")]
        public async Task<ActionResult> SetFinishRound([FromRoute] int id, [FromRoute] int roundId, [FromBody] FinishRoundCommand finishRoundCommand)
        {
            if (finishRoundCommand.TournamentId != id || finishRoundCommand.RoundId != roundId)
                return BadRequest();

            await Mediator.Send(finishRoundCommand);
            return Ok();
        }

        [HttpPut("{id}/round/{roundId}")]
        public async Task<ActionResult> UpdateRound([FromRoute] int id, [FromRoute] int roundId, [FromBody] UpdateRoundCommand updateRoundCommand)
        {
            if (updateRoundCommand.TournamentId != id || updateRoundCommand.RoundId != roundId)
                return BadRequest();

            await Mediator.Send(updateRoundCommand);
            return Ok();
        }

        [HttpGet("{id}/round/{roundId}")]
        public async Task<ActionResult> GetRound([FromRoute] int id, [FromRoute] int roundId)
        {
            var reuslt = await Mediator.Send(new ReadRoundQuery { TournamentId = id, RoundId = roundId });
            return Ok(reuslt);
        }

        [HttpPost("{id}/application/{applicationId}")]
        public async Task<ActionResult> AcceptApplication([FromRoute] int id, [FromRoute] int applicationId)
        {
            await Mediator.Send(new AcceptApplicationCommand { ApplicationId = applicationId, TournamentId = id });
            return Ok();
        }

        [HttpGet("{id}/application")]
        public async Task<ActionResult> GetApplications([FromRoute] int id)
        {
            var result = await Mediator.Send(new ApplicationsQuery { TournamentId = id });
            return Ok(result);
        }
    }

}
