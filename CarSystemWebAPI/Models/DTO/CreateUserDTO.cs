namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO użytkowników używany w zapytaniach o utworzenie użytkownika
    public record CreateUserDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        
    }
}
