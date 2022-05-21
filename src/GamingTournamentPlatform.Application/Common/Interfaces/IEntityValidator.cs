using GamingTournamentPlatform.Application.Common.Models;

namespace GamingTournamentPlatform.Application.Common.Interfaces
{
    public interface IEntityValidator<T> where T : class
    {
        Result Validate(T entity);
        Task<Result> ValidateAsync(T entity);
    }
}
