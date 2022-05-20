using GamingTournamentPlatform.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace GamingTournamentPlatform.Infrastructure.Data
{
    public static class ApplicationDbContextSeeder
    {
        public async static Task SeedDbContext(this IServiceProvider services, DefaultAdminData defaultAdminData, bool migrate)
        {
            using (var scope = services.CreateScope())
            {
                var identityDbContext = scope.ServiceProvider.GetRequiredService<ApplicationIdentityDbContext>();
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                if (migrate && (await identityDbContext.Database.GetPendingMigrationsAsync()).Any())
                {
                    await identityDbContext.Database.MigrateAsync();
                }

                if (migrate && (await dbContext.Database.GetPendingMigrationsAsync()).Any())
                {
                    await dbContext.Database.MigrateAsync();
                }

                await SeedDefaultAdminUser(defaultAdminData, scope);
            }
        }

        private static async Task SeedDefaultAdminUser(DefaultAdminData defaultAdminData, IServiceScope scope)
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            if (!await roleManager.RoleExistsAsync(defaultAdminData.Role))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = defaultAdminData.Role });
            }

            if (await userManager.FindByNameAsync(defaultAdminData.UserName) == null)
            {
                var newAdminUser = new ApplicationUser
                {
                    Email = defaultAdminData.Email,
                    UserName = defaultAdminData.UserName
                };
                await userManager.CreateAsync(newAdminUser, defaultAdminData.Password);
                var token = await userManager.GenerateEmailConfirmationTokenAsync(newAdminUser);
                await userManager.ConfirmEmailAsync(newAdminUser, token);
            }

            var adminUser = await userManager.FindByNameAsync(defaultAdminData.UserName);

            if (!await userManager.IsInRoleAsync(adminUser, defaultAdminData.Role))
            {
                await userManager.AddToRoleAsync(adminUser, defaultAdminData.Role);
            }
        }
    }

    public class DefaultAdminData
    {
        public string Role { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
