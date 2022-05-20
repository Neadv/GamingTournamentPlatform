using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Web.Services;

namespace GamingTournamentPlatform.Web.Configuration
{
    public static class DependencyEnjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddScoped<ICurrentUserService, CurrentUserService>();

            return services;
        }
    }
}
