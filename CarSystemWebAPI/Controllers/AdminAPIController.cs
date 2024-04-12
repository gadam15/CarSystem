using Azure.Core;
using CarSystemWebAPI.Models;
using CarSystemWebAPI.Models.DTO;
using CarSystemWebAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarSystemWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminAPIController : ControllerBase
    {
        private readonly AdminRepository _repository;
        public AdminAPIController(AdminRepository repository)
        {
            _repository = repository;
        }
        [HttpDelete("id:int"), Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CarDTO> DeleteCar(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            if (_repository.GetById(id) == null)
            {
                return NotFound();
            }

            _repository.Delete(id);

            return Ok();

        }
        [HttpPut("id:int", Name = "UpdateRole"), Authorize(Roles ="Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserDTO> UpdateRole(int id, UpdateRoleDTO userDTO)
        {

            if (userDTO == null)
            {
                return BadRequest();
            }
            var item = _repository.GetUserById(id);
            User model = new()
            {
                Id = id,
                UserName = item.UserName,
                Email = item.Email,
                PasswordHash = item.PasswordHash,
                PasswordSalt = item.PasswordSalt,
                Role = userDTO.Role,
                CreateDate = item.CreateDate,
                UpdateDate = DateTime.Now
            };
            _repository.Update(id, model);
            return Ok();

        }
        [HttpPut("id:int", Name = "UpdateUser"), Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserDTO> UpdateUser(int id, UpdateUserDTO userDTO)
        {
            if (userDTO == null)
            {
                return BadRequest();
            }
            var item = _repository.GetUserById(id);
            User model = new()
            {
                Id = id,
                UserName = userDTO.UserName,
                Email = userDTO.Email,
                PasswordHash = item.PasswordHash,
                PasswordSalt = item.PasswordSalt,
                Role = userDTO.Role,
                CreateDate = item.CreateDate,
                UpdateDate = DateTime.Now
            };
            _repository.Update(id, model);
            return Ok();
        }
        [HttpPatch("id:int")]
        public ActionResult<UserDTO> UpdatePartialUser(int id, JsonPatchDocument<UserDTO> patchDTO)
        {
            if (patchDTO == null)
            {
                return BadRequest();
            }

            var item = _repository.GetUserById(id);
            if (item == null)
            {
                return NotFound();
            }
            UserDTO userDTO = new()
            {
                Id = id,
                UserName = item.UserName,
                Email = item.Email,
                CreateDate = item.CreateDate,
                UpdateDate = DateTime.Now
            };

            patchDTO.ApplyTo(userDTO, ModelState);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = new()
            {
                Id = id,
                UserName = userDTO.UserName,
                Email = userDTO.Email,
                PasswordSalt = item.PasswordSalt,
                PasswordHash= item.PasswordHash,
                CreateDate = userDTO.CreateDate,
                UpdateDate = DateTime.Now
            };
            _repository.Update(id, user);
            return Ok();

        }
    }
}
