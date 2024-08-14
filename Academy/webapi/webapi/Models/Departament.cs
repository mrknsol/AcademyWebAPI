using System.ComponentModel.DataAnnotations;
namespace webapi.Models;
public class Department
{
    [Key]
    public string Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string TeacherId { get; set; }
    [Required]
    public Teacher Teacher { get; set; }
}