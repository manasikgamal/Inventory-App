using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryApp.API.Models;

namespace InventoryApp.API.Data
{
    public interface InventRepositoryInter
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         Task<bool> SaveAll();
         
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItem(int id);


    }
}