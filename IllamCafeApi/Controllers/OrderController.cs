using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IllamCafeApi.Data;
using IllamCafeApi.Models;

namespace IllamCafeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: all orders
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetAll()
    {
        return await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ToListAsync();
    }

    // GET: order by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> Get(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound();

        return order;
    }

    // POST: create order
    [HttpPost]
    public async Task<ActionResult<Order>> Create(CreateOrderDto dto)
    {
        var order = new Order();

        decimal total = 0;

        foreach (var item in dto.Items)
        {
            var product = await _context.Products.FindAsync(item.ProductId);

            if (product == null)
                return BadRequest($"Product {item.ProductId} not found");

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                Price = product.Price
            };

            total += product.Price * item.Quantity;

            order.Items.Add(orderItem);
        }

        order.TotalPrice = total;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = order.Id }, order);
    }

    // PUT: update status
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, OrderStatus status)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null)
            return NotFound();

        order.Status = status;

        await _context.SaveChangesAsync();

        return Ok(order);
    }
}