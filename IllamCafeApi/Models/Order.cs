using System.ComponentModel.DataAnnotations.Schema;

namespace IllamCafeApi.Models;

public class Order
{
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public decimal TotalPrice { get; set; }

    public List<OrderItem> Items { get; set; } = new();
}