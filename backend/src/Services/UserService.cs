using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.DTOs;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;
using sda_onsite_2_csharp_backend_teamwork.src.Utils;

namespace sda_onsite_2_csharp_backend_teamwork.src.Services;

public class UserService : IUserService
{

    private IUserRepository _userRepository;
    private IConfiguration _config;
    private IMapper _mapper;


    public UserService(IUserRepository userRepository, IConfiguration config, IMapper mapper)
    {
        _userRepository = userRepository;
        _config = config;
        _mapper = mapper;
    }

    public string SignIn(UserSignInDto userSign)
    {

        User? user = _userRepository.FindOneByEmail(userSign.Email);
        if (user is null) return null;

        byte[] pepper = Encoding.UTF8.GetBytes(_config["Jwt:Pepper"]!);

        bool isCorrectPass = PasswordUtils.VerifyPassword(userSign.Password, user.Password, pepper);
        if (!isCorrectPass) return null;

        var claims = new[]
             {
            new Claim(ClaimTypes.Name, user.FirstName),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SigningKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenString;
    }
    public UserReadDto? SignUp(UserCreateDto user)
    {
        User? foundUser = _userRepository.FindOneByEmail(user.Email);

        if (foundUser is not null)
        {
            return null;
        }

        byte[] pepper = Encoding.UTF8.GetBytes(_config["Jwt:Pepper"]!);

        PasswordUtils.HashPassword(user.Password, out string hashedPassword, pepper);

        user.Password = hashedPassword;
        User mappedUser = _mapper.Map<User>(user);

        User newUser = _userRepository.CreateOne(mappedUser);

        UserReadDto userRead = _mapper.Map<UserReadDto>(newUser);

        return userRead;


    }

    public List<UserReadDto> FindAll()
    {
        var users = _userRepository.FindAll();
        var usersRead = users.Select(_mapper.Map<UserReadDto>);
        return usersRead.ToList();
    }
    public UserReadDto? FindOneByEmail(string email)
    {
        User? user = _userRepository.FindOneByEmail(email);
        UserReadDto? userRead = _mapper.Map<UserReadDto>(user);
        return userRead;
    }

}
