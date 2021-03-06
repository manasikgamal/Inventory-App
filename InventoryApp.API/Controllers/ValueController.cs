using System.Linq;
using System.Threading.Tasks;
using InventoryApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ValueController : ControllerBase
    {
        private readonly DataContext _context;
        public ValueController(DataContext context)
        {
            _context = context;

        }
        
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
           var values= await _context.Values.ToListAsync();
           return Ok(values);
        }
         [AllowAnonymous]
         [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
           var value= await _context.Values.FirstOrDefaultAsync(x=>x.Id==id);
           return Ok(value);
        }

    }
}