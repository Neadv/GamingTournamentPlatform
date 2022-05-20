using GamingTournamentPlatform.Infrastructure.Data;
using GamingTournamentPlatform.Infrastructure.Identity;
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

            services.AddDbContext<ApplicationIdentityDbContext>(opts => opts.UseSqlServer(connectionString, b => b.MigrationsAssembly(typeof(ApplicationIdentityDbContext).Assembly.FullName)));
            services.AddDbContext<ApplicationDbContext>(opts => opts.UseSqlServer(connectionString, b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

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
                .AddEntityFrameworkStores<ApplicationIdentityDbContext>();

            return services;
        }
    }
}
