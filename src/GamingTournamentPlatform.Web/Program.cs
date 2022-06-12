using GamingTournamentPlatform.Application;
using GamingTournamentPlatform.Infrastructure;
using GamingTournamentPlatform.Web.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(opts => opts.Filters.Add<ApiExceptionFilterAttribute>());

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = builder.Configuration.GetValue<string>("ClientAppSourcePath");
});

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddServices();

builder.AddApplicationAuthentication();

var app = builder.Build();

app.UseStaticFiles();

if (!app.Environment.IsDevelopment())
{
    app.UseSpaStaticFiles();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(b =>
    {
        b.AllowAnyHeader();
        b.AllowAnyMethod();
        b.WithOrigins(app.Configuration.GetValue<string>("ClientAppDevelopmentServer"));
    });
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

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

app.SeedDatabase();

app.Run();
