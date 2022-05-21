namespace GamingTournamentPlatform.Application.Common.Models
{
    public class Result
    {
        public Result(IDictionary<string, List<string>> errors)
        {
            Errors = errors;
        }

        public Result()
        {
            Errors = new Dictionary<string, List<string>>();
        }

        public bool Succeeded => Errors.Count == 0;

        public IDictionary<string, List<string>> Errors { get; set; }

        public void AddError(string key, string message)
        {
            if (Errors.ContainsKey(key))
            {
                Errors[key].Add(message);
            }
            else
            {
                Errors.Add(key, new List<string> { message });
            }
        }

        public static Result Success()
        {
            return new Result();
        }
    }
}
