using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using InventoryApp.API.Data;
using InventoryApp.API.Dtos;
using InventoryApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace InventoryApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }
        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userforregisterdto)
        {

            if (await _repo.UserExists(userforregisterdto.Email))
                return BadRequest("User Already exists");

            var userTocreate = new User
            {
                Username = userforregisterdto.Username,
                Email=userforregisterdto.Email,
                Role=userforregisterdto.Role
            };

            var createduser = await _repo.Register(userTocreate, userforregisterdto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login(UserForLoginDto userforlogindto)
        {
            var userfromrepo = await _repo.Login(userforlogindto.Email, userforlogindto.Password);

            if (userfromrepo == null)
                return Unauthorized();

           var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier,userfromrepo.Id.ToString()),
            new Claim(ClaimTypes.Name,userfromrepo.Username)
          };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
           
           var cread= new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
           var tokendescripor=new SecurityTokenDescriptor
           {
               Subject=new ClaimsIdentity(claims),
               Expires=DateTime.Now.AddDays(1),
               SigningCredentials=cread
           };
           var tokenhandler=new JwtSecurityTokenHandler();
           var token=tokenhandler.CreateToken(tokendescripor);
           return Ok(new UserTokenToreturn{
               id=userfromrepo.Id,
               username=userfromrepo.Username,
               email=userfromrepo.Email,
               role=userfromrepo.Role,
               token=tokenhandler.WriteToken(token)
           });

        }

    }
}