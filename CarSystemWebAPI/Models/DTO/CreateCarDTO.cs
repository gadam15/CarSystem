namespace CarSystemWebAPI.Models.DTO
{

    //Plik DTO samochodów używany w zapytaniach o utworzenie samochodu
    public record CreateCarDTO
    {
       
        
        public string Marka { get; set; }
        public string Model { get; set; }
        public string Rok { get; set; }
        public string Licznik { get; set; }
        public string Opis { get; set; }
    }
}
