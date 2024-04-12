using CarSystemWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace CarSystemWebAPI.Data
{
    //W tym pliku znajduje się implementacja modelów na faktyczne tabele w bazie danych
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
           
        }

        //Ustawienie tabel bazy danych na podstawie modelów
        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }
        

        //Utworzenie relacji
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configures one-to-many relationship
            modelBuilder.Entity<User>()
                .HasMany(c => c.Cars)
                .WithOne(x=>x.User);
            modelBuilder.Entity<Car>()
                .HasOne(x => x.User)
                .WithMany(c=>c.Cars)
                .HasForeignKey(x => x.UserID);
                
        }

    }
}
