using GamingTournamentPlatform.Infrastructure.Data;

namespace Microsoft.AspNetCore.Builder
{
    public static class WebApplicationDatabaseSeedExtensions
    {
        public static WebApplication SeedDatabase(this WebApplication web)
        {
            var autoMigration = web.Configuration.GetValue<bool>("AutoMigration");

            var defaultAdminData = web.Configuration.GetSection("DefaultAdminData").Get<DefaultAdminData>();
            if (defaultAdminData == null)
                throw new NullReferenceException(nameof(defaultAdminData));

            web.Services.SeedDbContext(defaultAdminData, autoMigration).GetAwaiter().GetResult();

            return web;
        }
    }
}
