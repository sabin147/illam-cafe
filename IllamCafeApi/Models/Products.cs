namespace IllamCafeApi.Models;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string Category { get; set; } = ""; // Coffee / Tea

    public decimal Price { get; set; }

    public string Description { get; set; } = "";

    public bool IsAvailable { get; set; } = true;
}