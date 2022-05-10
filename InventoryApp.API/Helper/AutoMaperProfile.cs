using AutoMapper;
using InventoryApp.API.Dtos;
using InventoryApp.API.Models;

namespace InventoryApp.API.Helper
{
    public class AutoMaperProfile :Profile
    {
        public AutoMaperProfile()
        {
            CreateMap<User, UserToReturnDto>();
            CreateMap<Item, ItemToReturnDto>().ForMember(d=>d.DateAdded,opt=>{
                opt.MapFrom(s=>s.DateAdded.calDate());
            });
            CreateMap<ItemForCreationDto,Item>();
           
        }
    }
}