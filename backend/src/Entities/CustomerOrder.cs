using Microsoft.AspNetCore.Mvc;

using sda_onsite_2_csharp_backend_teamwork.src.Entities;
using sda_onsite_2_csharp_backend_teamwork.src;

namespace sda_onsite_2_csharp_backend_teamwork;


public class CustomerOrder
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public DateTime Date { get; set; } = DateTime.Now;
    public string Status { get; set; }
    public string Address { get; set; }
    public IEnumerable<OrderItem>? OrderItem { get; set; }



}