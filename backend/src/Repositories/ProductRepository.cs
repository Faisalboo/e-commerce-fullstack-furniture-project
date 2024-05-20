
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sda_onsite_2_csharp_backend_teamwork.src.Abstractions;
using sda_onsite_2_csharp_backend_teamwork.src.Databases;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;



namespace sda_backend_teamwork.src.Controllers
{
    public class ProductRepository : IProductRepository
    {

        private DatabaseContext _databaseContext;
        private DbSet<Product> _products;//wheneve we want to use the product Entities, import the files uplines

        public ProductRepository(DatabaseContext databaseContext)
        {
            _products = databaseContext.Products;//wheneve we want to use the product Entities, import the files uplines
            _databaseContext = databaseContext;
        }


        public Product CreateOne(Product newProduct)
        {
            _products.Add(newProduct);
            _databaseContext.SaveChanges();
            return newProduct;
        }

        public Product? DeleteProduct(Product deleeProduct)
        {
            _products.Remove(deleeProduct);
            _databaseContext.SaveChanges();
            return deleeProduct;
        }

        // public IEnumerable<Product> FindAll(int limit, int offset)

        // {   int limit = 1;
        //     int offset = (_products -1)* _products;
        //     var paginated = _products.Skip(offset).Take(limit);
        //     return _products.ToList();
        // }
        // public IEnumerable<Product> FindAll(int limit, int page)
        // {
        //     int offset = (page - 1) * limit;
        //     var paginated = _products.Skip(offset).Take(limit);
        //     return paginated.ToList();
        // }

        public IEnumerable<Product> FindAll()
        {
            return _products;
        }

        public Product? FindOne(Guid productId)
        {
            var foundProduct = _products.FirstOrDefault(product => product.Id == productId);

            return foundProduct;
        }
        public Product UpdateOne(Product updatedProduct)
        {
            _products.Update(updatedProduct);
            _databaseContext.SaveChanges();
            return updatedProduct;
        }
        public void UpdateQuantity(Product updatedProduct)
        {
            _products.Update(updatedProduct);
            _databaseContext.SaveChanges();
        }
    }
}