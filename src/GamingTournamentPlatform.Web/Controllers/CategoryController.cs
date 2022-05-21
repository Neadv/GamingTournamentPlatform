using System.ComponentModel.DataAnnotations;

using GamingTournamentPlatform.Application.Categories.Commands.Create;
using GamingTournamentPlatform.Application.Categories.Commands.Delete;
using GamingTournamentPlatform.Application.Categories.Commands.Update;
using GamingTournamentPlatform.Application.Categories.Queries.List;
using GamingTournamentPlatform.Application.Categories.Queries.Read;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace GamingTournamentPlatform.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ApiControllerBase
    {
        public CategoryController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await Mediator.Send(new CategoryListCommand());
            return Ok(result);
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult> GetById([FromRoute, Required] int categoryId)
        {
            var result = await Mediator.Send(new ReadCategoryCommand { CategoryId = categoryId });
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory([FromBody, Required] CreateCategoryCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("{categoryId}")]
        public async Task<ActionResult> UpdateCategory([FromRoute, Required] int categoryId, [FromBody, Required] UpdateCategoryCommand command)
        {
            if (categoryId != command.Id)
            {
                ModelState.AddModelError(nameof(categoryId), "Category ids don't match.");
                return ValidationProblem();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{categoryId}")]
        public async Task<ActionResult> DeleteById([FromRoute, Required] int categoryId)
        {
            await Mediator.Send(new DeleteCategoryCommand { CategoryId = categoryId });
            return NoContent();
        }
    }
}
