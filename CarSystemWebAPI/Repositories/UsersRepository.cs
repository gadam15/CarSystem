using CarSystemWebAPI.Data;
using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Net.Http;

namespace CarSystemWebAPI.Repositories
{
    //Repositorium zawierające funkcje związane z użytkownikami
    public class UsersRepository : EntityBaseRepository<User>, IUsersRepository
    {   
        //Połączenie z tabelami bazy danych oraz konfiguracja
        private readonly AppDbContext _db;
        private readonly IConfiguration _configuration;
        private DbSet<User> items;
        private DbSet<Car> cars;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsersRepository(AppDbContext db, IConfiguration configuration, IHttpContextAccessor httpContextAccessor) : base(db)
        {
            _db = db;
            _configuration = configuration;
            items = _db.Set<User>();
            cars = _db.Set<Car>();
            _httpContextAccessor = httpContextAccessor;
        }

        //Tworzenie Password Hash

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        //Weryfikacja Password Hash
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {

            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        //Pobieranie użytkownika na podstawie e-maila
        public User GetByEmail(string email)
        {
            var item = items.AsNoTracking().FirstOrDefault(x => x.Email == email);
            return item;
        }

        //Pobieranie użytkownika na postawie nazwy użytkownika
        public User GetByName(string name)
        {
            var item = items.AsNoTracking().FirstOrDefault(x => x.UserName == name);
            return item;
        }

        //Pobieranie użytkownia na podstawie ID
        public User GetUserById(int id)
        {
            var item = items.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return item;
        }

        //Tworzenie tokenu JWT
        public string CreateToken(User user)
        {
            var id = Convert.ToString(user.Id);
            var role = user.Role;
            List<Claim> claims = new List<Claim>()
            {
                
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("Role", role),
                new Claim("Id", id),
                new Claim("Expiry", DateTime.Now.AddSeconds(5).ToString())
                
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddSeconds(5),
                signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            
            
            return jwt;
        }

        //Generowanie Refresh Tokenu
        public string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[64];
            using(var numberGenerator = RandomNumberGenerator.Create())
            {
                numberGenerator.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }
        public ClaimsPrincipal? GetTokenPrincipal(string token)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var validation = new TokenValidationParameters
            {
                IssuerSigningKey = securityKey,
                ValidateLifetime = false,
                ValidateActor = false,
                ValidateIssuer = false,
                ValidateAudience = false,
            };
            
            return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
        }
        
        //Zwracanie Refresh Tokenu
        public RefreshTokenDTO RefreshToken(string cookie)
        {
            var user = items.AsNoTracking().FirstOrDefault(x=>x.RefreshToken== cookie);

            RefreshTokenDTO response = new();
     
            if (user is null || user.RefreshToken != user.RefreshToken || user.RefreshTokenExpiry < DateTime.Now)
            {
                return response;
            }
            response.JwtToken = CreateToken(user);
            response.RefreshToken = user.RefreshToken;
            response.Roles = user.Role;
            response.Id = user.Id.ToString();
            
            return response;
            
        }
        

        //Pobieranie użytkownika na podstawie ID
        public User FindUserById()
        {
            var id = _httpContextAccessor.HttpContext.User?.FindFirstValue("Id");
            var item = items.AsNoTracking().FirstOrDefault(x => x.Id.ToString() == id);
            return item;
        }

        //Pobieranie użytkownika na podstawie Refresh Token
        public User FindUserByRefreshToken(string cookie)
        {
            var item = items.AsNoTracking().FirstOrDefault(x => x.RefreshToken == cookie);
            return item;
        }

    }
}
