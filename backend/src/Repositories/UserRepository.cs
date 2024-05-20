using Microsoft.EntityFrameworkCore;
using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.Databases;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Repositories
{
    public class UserRepository : IUserRepository
    {
        private DatabaseContext _databaseContext;
        private DbSet<User> _users;
        public UserRepository(DatabaseContext databaseContext)
        {
            _users = databaseContext.Users;
            _databaseContext = databaseContext;

        }

        public IEnumerable<User> FindAll()
        {
            return _users;
        }

        public User CreateOne(User user)
        {
            _users.Add(user);
            _databaseContext.SaveChanges();
            return user;
        }
        public User? FindOneByEmail(string email)
        {
            User? user = _users.FirstOrDefault(user => user.Email == email);
            return user;
        }
    }

}