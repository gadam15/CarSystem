namespace CarSystemWebAPI.Models.DTO
{
    public class RefreshResponse
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
