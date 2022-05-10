using System;

namespace InventoryApp.API.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public string Title { get; set; }
        public DateTime DateAdded { get; set; }
        public string StorageName { get; set; }
        public string Type { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }

    }
}