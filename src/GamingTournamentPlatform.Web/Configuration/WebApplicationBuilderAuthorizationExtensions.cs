using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace GamingTournamentPlatform.Web.Configuration
{
    public static class WebApplicationBuilderAuthorizationExtensions
    {
        public static WebApplicationBuilder AddApplicationAuthentication(this WebApplicationBuilder web)
        {
            var authOptions = web.Configuration.GetSection("AuthOptions").Get<AuthOptions>();
            web.Services.AddSingleton(authOptions);

            web.Services.AddAuthorization();
            web.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = authOptions.Issuer,
                        ValidAudience = authOptions.Audience,
                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                    };
                });

            return web;
        }
    }
}
