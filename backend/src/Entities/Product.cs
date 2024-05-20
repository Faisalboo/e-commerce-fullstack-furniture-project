

namespace sda_onsite_2_csharp_backend_teamwork.src.Entities
{
    public class Product
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string? Image { get; set; }
        public string Description { get; set; }

        public Guid CategoryId { get; set; }



    }
}