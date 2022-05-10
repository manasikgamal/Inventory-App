using System;
using Microsoft.AspNetCore.Http;

namespace InventoryApp.API.Dtos
{
    public class ItemForCreationDto
    {
        public string Title { get; set; }
        public IFormFile File { get; set; }
         public string StorageName { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }

        public ItemForCreationDto()
        {
            DateAdded=DateTime.Now.Date;
        }
    }
}