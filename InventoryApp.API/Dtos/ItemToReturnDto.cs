using System;

namespace InventoryApp.API.Dtos
{
    public class ItemToReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string DateAdded { get; set; }
        public string StorageName { get; set; }
        public String Type { get; set; }

        public string PublicId { get; set; }
    }

}