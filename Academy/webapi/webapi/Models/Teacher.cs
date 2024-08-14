
using System.ComponentModel.DataAnnotations;

namespace webapi.Models;
public class Teacher
{
    [Key]
    public string Id { get; set; }
    [Required]
    public string UserId { get; set; }
    [Required]
    public User User { get; set; }
}