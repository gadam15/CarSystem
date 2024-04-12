using CarSystemWebAPI.Data;
using CarSystemWebAPI.Models.DTO;
using CarSystemWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using CarSystemWebAPI.Migrations;


namespace CarSystemWebAPI.Repositories
{
    //Plik zawiera generyczne funkcje
    public interface IEntity
    {
        int Id { get; set; }
    }
    //Połączenie z tabelami oraz konfiguracja
    public class EntityBaseRepository<T> : IEntityBaseRepository<T> where T : class, IEntity
    {

        private readonly AppDbContext _db;
        private DbSet<T> items;
        
        public EntityBaseRepository(AppDbContext db)
        {
            _db = db;
            items = _db.Set<T>();
        }


        //Pobranie wszystkich obiektów
        public IEnumerable<T> GetAll()
        {
            return items.ToList();
        }

        //Pobranie obiektu na podstawie ID
        public T GetById(int id)
        {
            var item = items.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return item;
        }

        //Utworzenie obiektu
        public void Create(T item)
        {
            items.Add(item);
            _db.SaveChanges();
        }

        //Aktualizacja obiektu
        public void Update(int id, T item)
        {

            items.Update(item);
            _db.SaveChanges();


        }

        //Usunięcie obiektu
        public void Delete(int id)
        {
            var item = items.Find(id);
            items.Remove(item);
            _db.SaveChanges();
        }
    }
}


