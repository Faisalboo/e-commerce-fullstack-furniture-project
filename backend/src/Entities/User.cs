using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using sda_onsite_2_csharp_backend_teamwork.src.Enums;

namespace sda_onsite_2_csharp_backend_teamwork.src.Entities;


[Index(nameof(Email), IsUnique = true)]
public class User
{
    private Random _rnd = new Random(); // generate salt

    public Guid Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [Required, EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    private int _salt;
    public int Salt
    {
        get { return _salt; }
        private set { _salt = value; }
    }

    public User()
    {
        _salt = _rnd.Next(10, 100);
    }
    public Role Role { get; set; } = Role.Customer;
    public IEnumerable<Order>? Order { get; set; }
}
