using sda_onsite_2_csharp_backend_teamwork.src.DTOs;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Abstractions


{
    public interface IProductService
    {
        public IEnumerable<ProductReadDto> FindAll(string? s);
        public Product CreateOne(ProductCreateDto newProduct);

        public Product? DeleteProduct(Guid produtId);
        public ProductReadDto? UpdateOne(Guid id, ProductReadDto updatedReadProduct);
        public ProductReadDto FindOne(Guid id);



    }
}