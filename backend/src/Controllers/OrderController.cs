using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.Controllers;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;
using sda_onsite_2_csharp_backend_teamwork.src.Repositories;
using sda_onsite_2_csharp_backend_teamwork.src.services;
using sda_onsite_2_csharp_backend_teamwork.src.Services;

namespace sda_onsite_2_csharp_backend_teamwork.src
{
    public class OrderController : CostumeController
    {
        private IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]

        public IEnumerable<Order> FindAll()
        {
            return _orderService.FindAll();

        }
        [HttpGet("{OrderId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public ActionResult<Order?> FindOne(Guid orderId)
        {
            return _orderService.FindOne(orderId);

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Order> CreateOne([FromBody] Order order)
        {

            if (order != null)
            {

                var createdOrder = _orderService.CreateOne(order);
                return CreatedAtAction(nameof(CreateOne), createdOrder);
            }

            return BadRequest();

        }

    }
}