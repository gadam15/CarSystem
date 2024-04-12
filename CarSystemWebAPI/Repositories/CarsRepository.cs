using CarSystemWebAPI.Data;
using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


//Repositorium zawierające funkcje związane z samochodami
namespace CarSystemWebAPI.Repositories
{
    public class CarsRepository : EntityBaseRepository<Car>, ICarsRepository
    {
        //Połączenie z tabelami bazy danych oraz niezbędna konfiguracja
        private readonly AppDbContext _db;
        private readonly IConfiguration _configuration;
        private DbSet<User> items;
        private DbSet<Car> cars;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CarsRepository(AppDbContext db, IConfiguration configuration, IHttpContextAccessor httpContextAccessor) : base(db)
        {
            _db = db;
            _configuration = configuration;
            items = _db.Set<User>();
            cars = _db.Set<Car>();
            _httpContextAccessor = httpContextAccessor;
        }

        //Funkcja pobierająca samochody danego użytkownika
        public List<Car> GetUserCars()
        {
            var id = _httpContextAccessor.HttpContext.User?.FindFirstValue("Id");

             id = _httpContextAccessor.HttpContext.User?.FindFirstValue("Id");

             var result = cars.Where(x => x.User.Id.ToString() == id).ToList();
            
            return result;
        }

        //Funkcja szukająca użytkownika na podstawie ID
        public User FindUser()
        {
            var id = _httpContextAccessor.HttpContext.User?.FindFirstValue("Id");
            var item = items.AsNoTracking().FirstOrDefault(x => x.Id.ToString() == id);
            return item;
        }
        
    }
}
