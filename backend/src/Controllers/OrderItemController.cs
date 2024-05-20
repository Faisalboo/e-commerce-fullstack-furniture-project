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
    public class OrderItemController : CostumeController
    {
        private IOrderItemService _orderItemService;

        public OrderItemController(IOrderItemService orderItemService)
        {
            _orderItemService = orderItemService;
        }

        [HttpGet]

        public IEnumerable<OrderItem> FindAll()
        {
            return _orderItemService.FindAll();

        }
        [HttpGet("{orderItemId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public ActionResult<OrderItem?> FindOne(Guid orderItemId)
        {
            return _orderItemService.FindOne(orderItemId);

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<OrderItem> CreateOne([FromBody] OrderItem orderItem)
        {

            if (orderItem != null)
            {

                var createdOrder = _orderItemService.CreateOne(orderItem);
                return CreatedAtAction(nameof(CreateOne), createdOrder);
            }

            return BadRequest();

        }




    }
}