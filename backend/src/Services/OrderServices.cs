

using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.Databases;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Services
{
    public class OrderServices : IOrderService
    {
        private IOrderRepository _orderRepository;
        private IConfiguration _config;


        public OrderServices(IOrderRepository orderRepository, IConfiguration config)
        {
            _orderRepository = orderRepository;
            _config = config;

        }

        public IEnumerable<Order> FindAll()
        {
            return _orderRepository.FindAll();

        }

        public Order? FindOne(Guid OrderId)
        {
            if (FindOne == null) throw new Exception();
            return _orderRepository.FindOne(OrderId);


        }

        public Order CreateOne([FromBody] Order order)
        {

            return _orderRepository.CreateOne(order);

        }


    }
}