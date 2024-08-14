using System.ComponentModel.DataAnnotations;

namespace webapi.Models;
public class Faculty
{
    [Key]
    public string Id { get; set; }

    [Required]
    public string Name { get; set; }
    [Required]
    public string GroupId { get; set; }
    [Required]
    public Group Group { get; set; }
}