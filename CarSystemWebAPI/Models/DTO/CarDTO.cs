using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO samochodów, który służy do komunikacji z API
    public record CarDTO
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public string Marka { get; set; }
        public string Model { get; set; }
        public string Rok { get; set; }
        public string Licznik { get; set; }
        public string Opis { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
     
    }
}
