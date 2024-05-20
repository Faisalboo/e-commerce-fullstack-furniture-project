
namespace sda_onsite_2_csharp_backend_teamwork.src.DTOs;

public class UserReadDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }

}
public class UserCreateDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
public class UserSignInDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}