using System.Collections.Generic;


namespace InventoryApp.API.Dtos
{
    public class UserToReturnDto
    {
        public int Id { get; set; }
         public string Username { get; set; }
          public string Email { get; set; }
          public string Role { get; set; }
         public ICollection<ItemToReturnDto> Items { get; set; }
    }
}