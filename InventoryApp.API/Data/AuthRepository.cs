using System;
using System.Threading.Tasks;
using InventoryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string email, string password)
        {
           var user= await _context.Users.FirstOrDefaultAsync(x=>x.Email==email);
           if(user==null)
               return null;
    
           if(!verifypassword(password,user.PassworHash,user.PasswordSalt))
           return null;

           return user;
        }

        private bool verifypassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0;i<computedhash.Length;i++)
                {
                  if(computedhash[i]!=passwordHash[i]) 
                  return false;
                }
               
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash,passwordSalt;
            CreatePassword(password,out passwordHash,out passwordSalt);
            user.PassworHash=passwordHash;
            user.PasswordSalt=passwordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
           return user;
        }

        private void CreatePassword(string password, out byte[] passwordHash,out byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512())
            {
              passwordSalt=hmac.Key;
              passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if(await _context.Users.AnyAsync(x=>x.Email==email))
            return true;

            return false;
        }
    }
}