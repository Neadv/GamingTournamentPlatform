using FluentValidation;
using GamingTournamentPlatform.Application.Common.Behaviors;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Services;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace GamingTournamentPlatform.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(DependencyInjection).Assembly);
            services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
            services.AddMediatR(typeof(DependencyInjection).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehavior<,>));

            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
