using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IllamCafeApi.Data;
using IllamCafeApi.Models;

namespace IllamCafeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    // GET all products
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
        return await _context.Products.ToListAsync();
    }

    // GET product by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound();

        return product;
    }

    // POST create product
    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(Get),
            new { id = product.Id },
            product
        );
    }

    // PUT update product
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product updatedProduct)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound();

        product.Name = updatedProduct.Name;
        product.Category = updatedProduct.Category;
        product.Price = updatedProduct.Price;
        product.Description = updatedProduct.Description;
        product.IsAvailable = updatedProduct.IsAvailable;

        await _context.SaveChangesAsync();

        return Ok(product);
    }

    // DELETE product
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}