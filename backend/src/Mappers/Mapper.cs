using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using sda_onsite_2_csharp_backend_teamwork.src.DTOs;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Mappers;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<User, UserReadDto>();
        CreateMap<UserReadDto, User>();

        CreateMap<CategoryCreateDto, Category>();

        CreateMap<UserCreateDto, User>();

        CreateMap<ProductReadDto, Product>();
        CreateMap<Product, ProductReadDto>();
        CreateMap<Product, ProductCreateDto>();
        CreateMap<ProductCreateDto, Product>();

    }

}
