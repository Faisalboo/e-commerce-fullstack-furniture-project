

namespace sda_onsite_2_csharp_backend_teamwork.src.Abstractions;

public interface ICustomerOrderService
{
    public IEnumerable<CustomerOrder> GetAllOrders();
    public CustomerOrder GetOrderById(Guid orderId);
    public void CreateOrder(CustomerOrder order);
    public void DeleteOrder(Guid orderId);
}
