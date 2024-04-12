using CarSystemWebAPI.Data;
using CarSystemWebAPI.Models;
using Microsoft.EntityFrameworkCore;


//Repositorium zawierające funkcje używane przez administratora
namespace CarSystemWebAPI.Repositories
{
    public class AdminRepository : EntityBaseRepository<User>, IAdminRepository
    {
        //Połączenie z tabelami bazy danych oraz niezbędna konfiguracja
        private readonly AppDbContext _db;
        private readonly IConfiguration _configuration;
        private DbSet<User> items;
        private DbSet<Car> cars;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AdminRepository(AppDbContext db, IConfiguration configuration, IHttpContextAccessor httpContextAccessor) : base(db)
        {
            _db = db;
            _configuration = configuration;
            items = _db.Set<User>();
            cars = _db.Set<Car>();
            _httpContextAccessor = httpContextAccessor;
        }

        //Aktualizacja roli użytkownika
        public void UpdateRole(int id, User user)
        {
            _db.Update(user);
            _db.SaveChanges();
        }

        //Pobieranie użytkownika przez ID
        public User GetUserById(int id)
        {
            var item = items.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return item;
        }
    }
}
