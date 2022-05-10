using System.Collections.Generic;

namespace InventoryApp.API.Models
{
    public class User
    {
         public int Id { get; set; }
         public string Username { get; set; }
         public string Email { get; set; }
         public string Role { get; set; }
         public byte[] PassworHash { get; set; }
         public byte[] PasswordSalt { get; set; }
         public ICollection<Item> Items { get; set; }
      
    }
}