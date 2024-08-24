using Microsoft.EntityFrameworkCore;
using webapi.Context;
using webapi.Models;
using webapi.Services.Interfaces;

namespace webapi.Services.Classes;

public class TeacherService : ITeacherService {
    private readonly AcademyContext _context;

    public TeacherService(AcademyContext context) 
    {
        _context = context;
    }

    public async Task<Teacher> AddTeacherAsync(SignUpUser teacher)
    {
        if (teacher.Password != teacher.ConfirmPassword)
        {
            throw new ArgumentException("Passwords do not match");
        }

        var user = new User{
            Name = teacher.Name,
            Surname = teacher.Surname,
            Age = teacher.Age,
            Email = teacher.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(teacher.Password),
            Role = "appuser"
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        var newTeacher = new Teacher
        {
            UserId = user.Id,
        };

        await _context.Teachers.AddAsync(newTeacher);
        await _context.SaveChangesAsync();

        return newTeacher;
    }

    public async Task DeleteTeacherAsync(string email)
    {
        var teacher = await _context.Teachers.FirstOrDefaultAsync(e => e.User.Email == email);
        if (teacher == null) throw new ArgumentException("Teacher not found");

        var user = await _context.Users.FindAsync(teacher.UserId);
        if (user != null)
        {
            _context.Users.Remove(user);
        }

        _context.Teachers.Remove(teacher);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Teacher>> GetAllTeachersAsync()
    {
        return await _context.Teachers.Include(s => s.User).ToListAsync();
    }

    public async Task<Teacher> UpdateTeacherAsync(string email, EditUser teacher)
    {
        var existingTeacher = await _context.Teachers.Include(s => s.User)
                                                    .FirstOrDefaultAsync(e => e.User.Email == email);
        if (existingTeacher == null) throw new ArgumentException("Teacher not found");

        existingTeacher.User.Name = teacher.Name;
        existingTeacher.User.Surname = teacher.Surname;
        existingTeacher.User.Email = teacher.Email;

        await _context.SaveChangesAsync();

        return existingTeacher;
    }
}

