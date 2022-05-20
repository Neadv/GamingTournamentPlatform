namespace GamingTournamentPlatform.Application.Common.Models
{
    public class Result
    {
        public Result(IDictionary<string, string[]> errors)
        {
            Errors = errors;
        }

        public Result()
        {
            Errors = new Dictionary<string, string[]>();
        }

        public bool Succeeded => Errors.Count == 0;

        public IDictionary<string, string[]> Errors { get; set; }

        public static Result Success()
        {
            return new Result();
        }
    }
}
