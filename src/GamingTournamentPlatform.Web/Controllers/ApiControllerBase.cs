using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GamingTournamentPlatform.Web.Controllers
{
    public abstract class ApiControllerBase : ControllerBase
    {
        protected IMediator Mediator { get; }

        public ApiControllerBase(IMediator mediator)
        {
            Mediator = mediator;
        }
    }
}
