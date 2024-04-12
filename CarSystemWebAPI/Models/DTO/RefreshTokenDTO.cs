namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO używaniu w zapytaniu dotyczącego odświerzenia tokenu JWT
    public class RefreshTokenDTO
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
        public string Roles { get; set; }
        public string Id { get; set; }
    }
}
