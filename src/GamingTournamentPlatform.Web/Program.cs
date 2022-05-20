using GamingTournamentPlatform.Application;
using GamingTournamentPlatform.Infrastructure;
using GamingTournamentPlatform.Web.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(opts => opts.Filters.Add<ApiExceptionFilterAttribute>());

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = builder.Configuration.GetValue<string>("ClientAppSourcePath");
});

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseStaticFiles();

if (!app.Environment.IsDevelopment())
{
    app.UseSpaStaticFiles();
}

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseSpa(spa =>
{
    spa.Options.SourcePath = app.Configuration.GetValue<string>("ClientAppSourcePath");
    if (app.Environment.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer(builder.Configuration.GetValue<string>("ClientAppDevelopmentServer"));
    }
});


app.Run();
