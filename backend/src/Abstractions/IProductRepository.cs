using sda_onsite_2_csharp_backend_teamwork.src.Entities;

namespace sda_onsite_2_csharp_backend_teamwork.src.Abstractions

{
    public interface IProductRepository
    {

        public IEnumerable<Product> FindAll();
        // CustomerOrder GetOrderById(int orderId);
        public Product CreateOne(Product newProduct);
        public Product UpdateOne(Product product);

        public Product? DeleteProduct(Product deleeProduct);
        public void UpdateQuantity(Product updatedProduct);

        public Product? FindOne(Guid id);



        // public Product? findOne(string productId);



    }
}