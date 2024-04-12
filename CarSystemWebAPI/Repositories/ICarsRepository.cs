using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CarSystemWebAPI.Repositories
{
    //Interface repozytorium samochodów
    public interface ICarsRepository
    {
        User FindUser();
        List<Car> GetUserCars();
        
    }
}
