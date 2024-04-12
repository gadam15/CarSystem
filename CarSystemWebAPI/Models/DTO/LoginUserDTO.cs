namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO używaniu w zapytaniu dotyczącego logowania
    public record LoginUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        
        
    }
}
