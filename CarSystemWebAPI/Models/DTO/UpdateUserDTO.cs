namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO używany w zapytaniu o aktualizację danych użytkownika
    public class UpdateUserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        
    }
}
