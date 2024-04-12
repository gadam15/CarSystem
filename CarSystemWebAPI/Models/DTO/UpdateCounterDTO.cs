namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO używany w zapytaniu o aktualizację stanu licznika samochodu
    public record UpdateCounterDTO
    {
        
        public string Licznik {  get; set; }
    }
}
