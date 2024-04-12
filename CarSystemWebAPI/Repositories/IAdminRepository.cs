using CarSystemWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarSystemWebAPI.Repositories
{
    //Interface repozytorium administratora
    public interface IAdminRepository
    {
        public void UpdateRole(int id, User user);
        public User GetUserById(int id);
    }
}
