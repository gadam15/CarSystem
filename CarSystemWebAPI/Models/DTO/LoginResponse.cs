namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO używaniu w zapytaniu dotyczącego logowania(odpowiedź)
    public class LoginResponse
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
        public string Role {  get; set; }
        public string Id { get; set; }
    }
}
