

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sda_onsite_2_csharp_backend_teamwork.src.Databases;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Abstractions
{
    public interface IOrderRepository
    {
        public IEnumerable<Order> FindAll();
        public Order? FindOne(Guid orderId);
        public Order CreateOne(Order order);
        public bool DeleteOne(Guid orderId);



    }
}