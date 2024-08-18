using System.ComponentModel.DataAnnotations;
namespace webapi.Models;
public class Group
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    [Required]
    public string Name { get; set; }
    [Required]
    public int countOfStudents { get; set; }
    [Required]
    public string TeacherId { get; set; }
    public Teacher Teacher { get; set; }
    public ICollection<Student> Students { get; set; } = new List<Student>();
}