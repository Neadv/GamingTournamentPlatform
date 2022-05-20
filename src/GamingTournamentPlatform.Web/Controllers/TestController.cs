using Microsoft.AspNetCore.Mvc;

namespace GamingTournamentPlatform.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Test()
        {
            return Ok("Test");
        }
    }
}
