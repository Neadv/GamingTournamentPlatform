namespace GamingTournamentPlatform.Application.Common.Models
{
    public class Result
    {
        public Result(IEnumerable<string> errors)
        {
            Errors = errors.ToArray();
        }

        public bool Succeeded => Errors.Length == 0;

        public string[] Errors { get; set; }

        public static Result Success()
        {
            return new Result(Array.Empty<string>());
        }
    }
}
