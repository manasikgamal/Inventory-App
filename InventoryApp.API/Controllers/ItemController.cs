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

namespace InventoryApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users/{userId}/item")]
    public class ItemController : ControllerBase
    {
        private readonly InventRepositoryInter _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryconfig;
        private Cloudinary _cloudinary;
        public ItemController(InventRepositoryInter repo, IMapper mapper,
    
    
        IOptions<CloudinarySettings> cloudinaryconfig)
        {
            _cloudinaryconfig = cloudinaryconfig;
            _mapper = mapper;
            _repo = repo;

            Account acc=new Account(
                _cloudinaryconfig.Value.CloudName,
                _cloudinaryconfig.Value.ApiKey,
                _cloudinaryconfig.Value.ApiSecret

            );
             _cloudinary=new Cloudinary(acc);
        }
        [HttpGet("{id}",Name ="GetItem")]
         [ActionName( "AddItemsForUser" )] 
        public async Task<IActionResult> GetItem(int id)
        {
             var itemfromrepo= await _repo.GetItem(id);
             var item=_mapper.Map<ItemToReturnDto>(itemfromrepo);
             return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> AddItemsForUser(int userId,[FromForm]ItemForCreationDto itemforcreationdto)
        {
           if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
             var userfromrepo= await _repo.GetUser(userId);
             var file=itemforcreationdto.File;
             var uploadresult= new ImageUploadResult();

             if(file.Length>0)
             {
                 using(var stream=file.OpenReadStream())
                 {
                     var uploadprams= new ImageUploadParams()
                     {
                         File=new FileDescription(file.Name,stream),
                         Transformation=new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")

                     };
                     uploadresult=_cloudinary.Upload(uploadprams);
                 }
             }
             itemforcreationdto.Url= uploadresult.Url.ToString();
             itemforcreationdto.PublicId=uploadresult.PublicId;
             var item=_mapper.Map<Item>(itemforcreationdto);
             userfromrepo.Items.Add(item);
            
             if(await _repo.SaveAll())
             {
                 var itemtoreturn=_mapper.Map<ItemToReturnDto>(item);
                 return CreatedAtRoute("GetItem", new {id=item.Id},itemtoreturn);
             }
             return BadRequest("could not add the item");
             
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int userId,int id)
        {
            if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
             var user= await _repo.GetUser(userId);
              if(!user.Items.Any(p=>p.Id==id))
              return Unauthorized();
            var itemfromrepo= await _repo.GetItem(id);

            if(itemfromrepo.PublicId != null)
            {
               var deleteprams=new DeletionParams(itemfromrepo.PublicId);

            var result=_cloudinary.Destroy(deleteprams);
            if(result.Result=="ok")
            {
                _repo.Delete(itemfromrepo);
            }
            }
            if(itemfromrepo.PublicId == null)
            {
               _repo.Delete(itemfromrepo);
            }
            
            if(await _repo.SaveAll())
            return Ok();

            return BadRequest("Could not delete item");
        }
}
}