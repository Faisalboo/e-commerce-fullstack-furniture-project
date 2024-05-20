using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.DTOs;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Controllers;


public class UserController : CostumeController
{
    private IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    // [Authorize(Roles = "Admin")]
    public List<UserReadDto> FindAll()
    {
        return _userService.FindAll();
    }

    [HttpGet("{email}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<UserReadDto?> FindOne(string email)
    {
        return Ok(_userService.FindOneByEmail(email));
    }

    [HttpPost("signup")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<UserReadDto> SignUp([FromBody] UserCreateDto user)
    {
        if (user is not null)
        {
            var createdUser = _userService.SignUp(user);
            return CreatedAtAction(nameof(SignUp), createdUser);
        }
        return BadRequest();
    }
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<string> SignIn([FromBody] UserSignInDto user)
    {
        if (user is not null)
        {
            string token = _userService.SignIn(user);
            if (token is null)
            {
                return BadRequest();
            }

            return Ok(token);
        }
        return BadRequest();
    }
}