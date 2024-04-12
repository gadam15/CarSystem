using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace CarSystemWebAPI.Repositories
{
    //Interface repozytorium użytkowników
    public interface IUsersRepository
    {
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        public User GetByEmail(string email);
        public string CreateToken(User user);
        
    }
}
