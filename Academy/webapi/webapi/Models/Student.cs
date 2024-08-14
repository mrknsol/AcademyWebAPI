
using System.ComponentModel.DataAnnotations;
using webapi.Models;

public class Student
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        public string UserId { get; set; }
        [Required]
        public User User { get; set; }
        public string? GroupId { get; set; }
        public Group Group { get; set; }
    }