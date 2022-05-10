namespace InventoryApp.API.Dtos
{
    public class UserTokenToreturn
    {
        public int id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string role { get; set; }
        public string token { get; set; }
    }
}