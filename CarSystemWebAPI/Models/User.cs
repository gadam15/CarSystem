using CarSystemWebAPI.Repositories;
using System.ComponentModel.DataAnnotations;

namespace CarSystemWebAPI.Models
{
    //Model użytkowników, na podstawie którego powstaje tabela w bazie danych
    public class User : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime CreateDate {  get; set; }
        public DateTime UpdateDate { get; set; }
        public ICollection<Car> Cars { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }

    }
}
