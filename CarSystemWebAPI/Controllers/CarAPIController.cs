using CarSystemWebAPI.Data;
using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using CarSystemWebAPI.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;

//W tym pliku mieszczą się wszystkie metody związane z samochodami
namespace CarSystemWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CarAPIController : ControllerBase
    {

        //Połoączenie z repozytorium
        private readonly CarsRepository _repository;
        public CarAPIController(CarsRepository repository)
        {
            _repository = repository;
        }
        //Metoda get pobierająca wszystkie samochody z bazy danych
        [HttpGet]
        public ActionResult GetAllCars()
        {
            return Ok(_repository.GetAll());
        }

        //Metoda get pobierająca samochody zalogowanego użytkownika
        [HttpGet, Authorize]
        public ActionResult<string> GetUserCars()
        {
            
            return Ok(_repository.GetUserCars());
        }

        //Metoda get pobierająca konkretny samochów na podstawie jego ID
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Car> GetCarById(int id)
        {
            
            if (id == 0)
            {
                return BadRequest();
            }
            var car = _repository.GetById(id);
            
            if (car == null)
            {
                return NotFound(car);
            }
            return car;
           
        }
        
        //Metoda post tworząca samochód w bazie danych
        [HttpPost, Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public ActionResult<CarDTO> CreateCar(CreateCarDTO carDTO)
        {
            
            if (carDTO == null)
            {
                return BadRequest();
            }

            var user = _repository.FindUser();

            Car model = new()
            {
                UserID = user.Id,
                Marka = carDTO.Marka,
                Model = carDTO.Model,
                Rok = carDTO.Rok,
                Opis = carDTO.Opis,
                Licznik = carDTO.Licznik,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now
            };
            
           
            _repository.Create(model);
            
            return Ok(model);
        }
        
        //Metoda delete usuwająca auto z bazy danych
        [HttpDelete("{id:int}"), Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CarDTO> DeleteUserCar(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var user = _repository.FindUser();
            var item = _repository.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            if (item.UserID == user.Id)
            {
                _repository.Delete(id);
            }
            else
            {
                return BadRequest("Not allowed user");
            }

            return Ok();

        }

        //Metoda put aktualizująca dane w bazie danych
        [HttpPut("{id:int}"), Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CarDTO> UpdateCar(int id, UpdateCarDTO carDTO)
        {
            
            if (carDTO == null)
            {
                return BadRequest();
            }
            
            var item = _repository.GetById(id);
            var user = _repository.FindUser();

            Car model = new()
                {
                    Id = id,
                    UserID = item.UserID,
                    
                    Marka = carDTO.Marka,
                    Model = carDTO.Model,
                    Rok = carDTO.Rok,
                    Opis = carDTO.Opis,
                    Licznik = carDTO.Licznik,
                    CreateDate = item.CreateDate,
                    UpdateDate = DateTime.Now
                };
            if (model.UserID == user.Id)
            {
                _repository.Update(id, model);
            }
            else
            {
                return BadRequest("Not allowed user");
            }
            
            
            return NoContent();
        }

        //Metoda patch aktualizująca pojedyncze elementy 
        [HttpPatch("{id:int}"), Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CarDTO> UpdatePartialCar(int id, JsonPatchDocument<CarDTO> patchDTO)
        {
            if (patchDTO == null)
            {
                return BadRequest();
            }
            var item = _repository.GetById(id);
            var user = _repository.FindUser();

            CarDTO carDTO = new()
            {
                Id = id,
                UserID= item.UserID,
                Marka = item.Marka,
                Model = item.Model,
                Rok = item.Rok,
                Opis = item.Opis,
                Licznik = item.Licznik,
                CreateDate = item.CreateDate,
                UpdateDate = DateTime.Now
            };
            if(item == null)
            {
                return NotFound();
            }
            patchDTO.ApplyTo(carDTO, ModelState);
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Car model = new()
            {   
                Id = id,
                UserID = item.UserID,
                Marka = carDTO.Marka,
                Model = carDTO.Model,
                Rok = carDTO.Rok,
                Opis = carDTO.Opis,
                Licznik = carDTO.Licznik,
                CreateDate = item.CreateDate,
                UpdateDate = carDTO.UpdateDate
            };
            if (model.UserID == user.Id)
            {
                _repository.Update(id, model);
            }
            else
            {
                return BadRequest("Not allowed user");
            }

            return NoContent();
        }

        //Metoda aktualizująca wartość licznika
        [HttpPut("{id:int}"), Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserDTO> UpdateCounter(int id, UpdateCounterDTO carDTO)
        {

            if (carDTO == null)
            {
                return BadRequest();
            }
            var item = _repository.GetById(id);
            var user = _repository.FindUser();
            Car model = new()
            {
                Id = id,
                UserID = item.UserID,
                Marka = item.Marka,
                Model = item.Model,
                Rok = item.Rok,
                Opis = item.Opis,
                Licznik = carDTO.Licznik,
                CreateDate = item.CreateDate,
                UpdateDate = DateTime.Now
            };
            if (model.UserID == user.Id)
            {
                _repository.Update(id, model);
            }
            else
            {
                return BadRequest("Not allowed user");
            }
            _repository.Update(id, model);
            return Ok();

        }

    }
}
