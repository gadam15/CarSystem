namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO używany w zapytaniu aktualizującym samochów w bazie danych
    public record UpdateCarDTO
    {
        
        public string Marka { get; set; }
        public string Model { get; set; }
        public string Rok { get; set; }
        public string Licznik { get; set; }
        public string Opis { get; set; }
    }
}
