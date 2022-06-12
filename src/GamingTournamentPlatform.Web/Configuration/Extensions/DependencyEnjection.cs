using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Web.Services;

using Microsoft.OpenApi.Models;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyEnjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "GamingTournamentPlatform.Api",
                    Version = "v1"
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });

            services.AddHttpContextAccessor();

            services.AddCors();

            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddTransient<ITokenGenerator, TokenGenerator>();

            return services;
        }
    }
}
