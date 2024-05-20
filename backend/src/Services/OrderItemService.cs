using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using sda_onsite_2_csharp_backend_teamwork.src.Controllers;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;
using sda_onsite_2_csharp_backend_teamwork.src.services;

namespace sda_onsite_2_csharp_backend_teamwork.src.Services;
public class OrderItemService : IOrderItemService
{
    private readonly IOrderItemRepository _orderItemRepository;

    public OrderItemService(IOrderItemRepository orderItemRepository)
    {
        _orderItemRepository = orderItemRepository;
    }

    public IEnumerable<OrderItem> FindAll()
    {
        return _orderItemRepository.FindAll();
    }

    public OrderItem? FindOne(Guid orderId)
    {
        return _orderItemRepository.FindOne(orderId);
    }
    public OrderItem CreateOne(OrderItem newOrder)
    {
        return _orderItemRepository.CreateOne(newOrder);
    }


}
