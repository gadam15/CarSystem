using CarSystemWebAPI.Data;
using CarSystemWebAPI.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

//Podstawowa konfiguracja programu

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
// Add services to the container.


builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme { 
        In = ParameterLocation.Header,
        Name= "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

//Po³¹czenie z baz¹ danych MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

//Buildowanie serwisów
builder.Services.AddScoped<CarsRepository>();
builder.Services.AddScoped<UsersRepository>();
builder.Services.AddScoped<AdminRepository>();

//Konfiguracja zabezpieczeñ CORS oraz JWT Token
builder.Services.AddCors(options => options.AddPolicy("policy", policy =>
{
    policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
}));
builder.Services.AddHttpContextAccessor();
builder.Services.AddAuthentication().AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
        ClockSkew = TimeSpan.Zero
    };
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("policy");
app.UseAuthorization();

app.MapControllers();

app.Run();
