using CarSystemWebAPI.Repositories;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;

namespace CarSystemWebAPI.Models
{
    //Model aut, na podstawie którego powstaje tabela w bazie danych
    public class Car : IEntity
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("UserID")]
        public int UserID { get; set; }
        public User User { get; set; }
        public string Marka { get; set; }
        public string Model { get; set; }
        public string Rok { get; set; }
        public string Licznik { get; set; }
        public string Opis { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
