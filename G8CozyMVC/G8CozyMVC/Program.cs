using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using G8CozyMVC.Data;
using System.Configuration;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<G8CozyMVCContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("G8CozyMVCContext") ?? throw new InvalidOperationException("Connection string 'G8CozyMVCContext' not found.")));

// Configure AppSettings
// builder.Configuration.Bind("AppSettings", new AppSettings());
// builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// Add MVC services
builder.Services.AddLogging(builder => builder.AddConsole());
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation(); // NOTE install Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options => {
    options.Cookie.Name = "MyApp.Session";
    options.IdleTimeout = TimeSpan.FromSeconds(10000);
    options.Cookie.IsEssential = true;

    // Set SameSite=None for all paths
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Set to true if serving over HTTPS
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Cookies
app.UseRouting();

// Add this line to configure sessions
app.UseSession();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.UseEndpoints(endpoints =>
{
    // Your endpoint configurations
});

app.Run();