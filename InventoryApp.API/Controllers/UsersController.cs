using System.Threading.Tasks;
using InventoryApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Collections.Generic;
using InventoryApp.API.Dtos;

namespace InventoryApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly InventRepositoryInter _repo;
        private readonly IMapper _mapper;
        public UsersController(InventRepositoryInter repo,IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users= await _repo.GetUsers();
            var userstoreturn=_mapper.Map<IEnumerable<EmailToReturnDto>>(users);
            return Ok(userstoreturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user= await _repo.GetUser(id);
            var usertoreturn=_mapper.Map<UserToReturnDto>(user);
            return Ok(usertoreturn);
        }
    }
}