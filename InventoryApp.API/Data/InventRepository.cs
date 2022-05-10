using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryApp.API.Data
{
    public class InventRepository : InventRepositoryInter
    {
        private readonly DataContext _context;
        public InventRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Item> GetItem(int id)
        {
            var item= await _context.Items.FirstOrDefaultAsync(p=>p.Id==id);
            return item;
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            var Items= await _context.Items.ToListAsync();
            return Items;
        }

        public async Task<User> GetUser(int id)
        {
            var user= await _context.Users.Include(i=>i.Items).FirstOrDefaultAsync(u=>u.Id==id);
            
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
           var users= await _context.Users.Include(i=>i.Items).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}