using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using InventoryApp.API.Data;
using InventoryApp.API.Dtos;
using InventoryApp.API.Helper;
using InventoryApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace InventoryApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class ItemsController: ControllerBase
    {
        private readonly InventRepositoryInter _repo;
        private readonly IMapper _mapper;
        public ItemsController(InventRepositoryInter repo,IMapper mapper)
        {
          _mapper = mapper;
          _repo = repo;
            
        }
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items= await _repo.GetItems();
            var itemstoreturn=_mapper.Map<IEnumerable<ItemsToReturnDto>>(items);
            return Ok(itemstoreturn);
        }
    }
}