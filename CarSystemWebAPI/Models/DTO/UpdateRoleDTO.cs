namespace CarSystemWebAPI.Models.DTO
{
    //Plik DTO używany w zapytaniu o aktualizację roli użytkownika
    public record UpdateRoleDTO
    {
        
        public string Role {  get; set; }
    }
}
