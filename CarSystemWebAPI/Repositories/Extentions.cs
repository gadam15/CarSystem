using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using System.ComponentModel.DataAnnotations;

namespace CarSystemWebAPI.Repositories
{
    public static class Extentions
    {
        //Zwrócenie konkretnych obiektów jako DTO
        public static CarDTO AsDTO(this Car car)
        {
            return new CarDTO {
            Id = car.Id,
            
            Marka = car.Marka,
            Model = car.Model,
            Rok = car.Rok, 
            Licznik = car.Licznik,
            CreateDate = car.CreateDate,
            UpdateDate = car.UpdateDate,
            };
        }
        public static UserDTO AsDTO(this User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                CreateDate = user.CreateDate,
                UpdateDate = user.UpdateDate
            };
        }
    }
}
