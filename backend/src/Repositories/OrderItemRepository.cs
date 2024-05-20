using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sda_onsite_2_csharp_backend_teamwork.src.Databases;
namespace sda_onsite_2_csharp_backend_teamwork.src.Repositories;

[Route("[controller]")]
public class OrderItemRepository : IOrderItemRepository
{
    private DatabaseContext _databaseContext;
    private DbSet<OrderItem> _orderItems;
    public OrderItemRepository(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
        _orderItems = databaseContext.OrderItems;
    }

    public IEnumerable<OrderItem> FindAll()
    {
        return _orderItems;
    }
    public OrderItem? FindOne(Guid orderId)
    {
        return _orderItems.Find(orderId);
    }

    public OrderItem CreateOne(OrderItem newOrder)
    {
        _orderItems.Add(newOrder);
        _databaseContext.SaveChanges();
        return newOrder;

    }
}
