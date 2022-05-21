using FluentValidation.Results;

using GamingTournamentPlatform.Application.Common.Models;

namespace GamingTournamentPlatform.Application.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException()
            : base("One or more validation failures have occurred.")
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(IDictionary<string, string[]> errors)
        {
            Errors = errors;
        }

        public ValidationException(Result result)
        {
            Errors = result.Errors.ToDictionary(k => k.Key, v => v.Value.ToArray());
        }

        public ValidationException(IEnumerable<ValidationFailure> failures)
            : this()
        {
            Errors = failures
                .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        }

        public IDictionary<string, string[]> Errors { get; }
    }
}
