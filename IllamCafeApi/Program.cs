using Microsoft.EntityFrameworkCore;
using IllamCafeApi.Data;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// DB (SQLite)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=cafe.db"));

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Illam Cafe API",
        Version = "v1",
        Description = "CRUD API for Coffee & Tea Shop"
    });
});

builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
  p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
// after var app = builder.Build();
var app = builder.Build();


app.UseCors();


// Swagger middleware
app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Illam Cafe API v1");
    c.RoutePrefix = string.Empty; // makes Swagger open at root URL
});



// HTTPS + routing
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();