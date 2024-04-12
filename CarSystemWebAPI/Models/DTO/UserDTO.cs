namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO użytkowników, który służy do komunikacji z API
    public record UserDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public ICollection<Car> Cars { get; set; }
    }
}
