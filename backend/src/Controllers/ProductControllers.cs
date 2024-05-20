
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.Databases;
using sda_onsite_2_csharp_backend_teamwork.src.DTOs;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Controllers

{
    public class ProductController : CostumeController
    {

        private readonly IProductService _productService; //this to inject the service methods into the controller

        public ProductController(IProductService productService) // this is the constructor dependency injection
        {
            _productService = productService;
        }
        // products?limit=5&page=1

        [HttpGet]
        public ActionResult<IEnumerable<Product>> FindAll([FromQuery(Name = "s")] string? s)
        {
            return Ok(_productService.FindAll(s)); // this to run the method to get all the products
        }


        [HttpPost] //to use this method, import AspNetCore
        public ActionResult<Product> CreateOne([FromBody] ProductCreateDto productCreateDto) //this is the body example to send data
        {
            if (productCreateDto != null)
            {
                return Ok(_productService.CreateOne(productCreateDto));//this is how we talk to service
            }
            throw new Exception("");
        }

        [HttpDelete("{productId}")]
        public Product? DeleteProduct(Guid productId)
        {
            return _productService.DeleteProduct(productId);
        }

        [HttpGet("{productId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ProductReadDto> FindOne(Guid productId)
        {
            ProductReadDto? product = _productService.FindOne(productId);
            if (product is null) return NotFound();

            return Ok(product);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ProductReadDto> UpdateOne(Guid id, [FromBody] ProductReadDto updatedProduct)
        {
            ProductReadDto? product = _productService.UpdateOne(id, updatedProduct);
            if (product is null) return BadRequest();
            return CreatedAtAction(nameof(UpdateOne), product);
        }
    }
}