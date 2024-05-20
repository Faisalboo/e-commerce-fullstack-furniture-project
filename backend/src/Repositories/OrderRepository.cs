using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.Databases;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;


namespace sda_onsite_2_csharp_backend_teamwork.src.Repositories
{
    public class OrderRepository : IOrderRepository

    {

        private DbSet<Order> _orders;
        private DatabaseContext _DbSet;

        public OrderRepository(DatabaseContext databaseContext)
        {
            _orders = databaseContext.Orders;
            _DbSet = databaseContext;
        }

        public IEnumerable<Order> FindAll()
        {
            return _orders;
        }

        public Order? FindOne(Guid OrderId)
        {
            var findOrder = _orders.FirstOrDefault((order) => order.Id == OrderId);
            return findOrder;

        }

        public Order CreateOne(Order newOrder)
        {
            _orders.Add(newOrder);
            _DbSet.SaveChanges();

            return newOrder;
        }

        public bool DeleteOne(Guid orderId)
        {
            var deleteOrder = FindOne(orderId);
            _orders.Remove(deleteOrder!);
            _DbSet.SaveChanges();

            return true;
        }
    }
}