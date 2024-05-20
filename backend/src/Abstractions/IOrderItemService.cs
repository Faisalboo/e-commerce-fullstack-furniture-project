using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sda_onsite_2_csharp_backend_teamwork.src.Controllers;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.services;
public interface IOrderItemService
{
    public OrderItem CreateOne(OrderItem orderItem);
    public IEnumerable<OrderItem> FindAll();
    public OrderItem? FindOne(Guid orderItemId);

}