using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Infrastructure.Data;
using GamingTournamentPlatform.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GamingTournamentPlatform.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("GamingTournamentPlatformConnectionString");

            services.AddDbContext<ApplicationIdentityDbContext>(opts => opts.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(ApplicationIdentityDbContext).Assembly.FullName)));
            services.AddDbContext<ApplicationDbContext>(opts => opts.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

            services.AddScoped<IApplicationDbContext>(s => s.GetRequiredService<ApplicationDbContext>());

            services.AddIdentityCore<ApplicationUser>(opts =>
            {
                // TODO: Get from appsettings
                opts.Password.RequireUppercase = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequiredLength = 6;
                opts.Password.RequireDigit = true;
            })
                .AddRoles<ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationIdentityDbContext>()
                .AddDefaultTokenProviders();

            services.AddTransient<IIdentityService, IdentityService>();

            return services;
        }
    }
}
