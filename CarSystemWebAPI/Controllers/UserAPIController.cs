using Azure;
using CarSystemWebAPI.Data;
using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using CarSystemWebAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using System.Security.Cryptography;

namespace CarSystemWebAPI.Controllers
{
    //W tym pliku mieszczą się wszystkie metody związane z użytkownikami
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserAPIController : ControllerBase
    {
        public readonly UsersRepository _repository;
        public readonly AppDbContext _db;
        //Połączenie z bazą danych i repozytorium.
        public UserAPIController(UsersRepository repository, AppDbContext db)
        {
            _repository = repository;
            _db = db;
        }
        //Metoda get pobbierająca użytkowników z bazy danych
        [HttpGet, Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<UserDTO>> GetUsers()
        {
            return Ok(_repository.GetAll());
        }

        //Metoda get pobierająca konkretnego użytkownika na podstawie jego ID
        [HttpGet("{id:int}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _repository.GetById(id);
            return Ok(user);
        }
        
        //Metoda usuwająca użytkownika na podstawie jego ID
        [HttpDelete("{id:int}"), Authorize]
        public ActionResult<UserDTO> DeleteUser(int id) 
        { 
            _repository.Delete(id);

            return Ok();
        }
        
        //Metoda rejestracji użytkownika
        [HttpPost]
        public async Task<ActionResult<UserDTO>> Register(CreateUserDTO request)
        {
            _repository.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            User user = new() {
                
                UserName = request.UserName,
                Email = request.Email,
                Role = "User",
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
            };
            _repository.Create(user);
            return Ok(user);
        }

        //Metoda logowania użytkownika
        [EnableCors("policy")]
        [HttpPost]
         public async Task<ActionResult<User>> Login(LoginUserDTO request)
        {
            var user = _repository.GetByEmail(request.Email);
            if(user == null)
            {
                return BadRequest("User not found");
            }
            if (!_repository.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong Password");
            }
            string token = _repository.CreateToken(user);
            string refreshToken = _repository.GenerateRefreshTokenString();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.Now.AddDays(30);
            _repository.Update(user.Id, user);
            var principal = _repository.GetTokenPrincipal(token);
            var role = user.Role;
            var id = user.Id.ToString();
            CookieOptions opt = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(30),
                Secure = true,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None

            };
            Response.Cookies.Append("refresh", refreshToken, opt);
            return Ok(new LoginResponse
            {
                JwtToken = token,
                RefreshToken = refreshToken,
                Role = role,
                Id = id
            });
        
        }

        //Metoda zwracająca odświerzony token JWT
        
        [HttpGet]
        public async Task<IActionResult> GetRefreshToken()
        {
            var refreshToken = Request.Cookies["refresh"];
            var token = _repository.RefreshToken(refreshToken);
            return Ok(token);
        }

        //Metoda wylogowania
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            
            if (Request.Cookies["refresh"] == null)
            {
                return NoContent();
            }
            var refreshToken = Request.Cookies["refresh"];
            var user = _repository.FindUserByRefreshToken(refreshToken);
            if(user == null)
            {
                Response.Cookies.Delete("refresh");
                return NoContent();
            }
            CookieOptions opt = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(30),
                Secure = true,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None

            };

            user.RefreshToken = null;
            
            

            Response.Cookies.Delete("refresh", opt);
            return NoContent();
        }
    }
}
