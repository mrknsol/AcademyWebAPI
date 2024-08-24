using webapi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Context;
using webapi.Services.Interfaces;

public class StudentService : IStudentService
{
    private readonly AcademyContext _context;

    public StudentService(AcademyContext context)
    {
        _context = context;
    }

    public async Task<Student> AddStudentAsync(SignUpUser signUpUser)
    {
        if (signUpUser.Password != signUpUser.ConfirmPassword)
        {
            throw new ArgumentException("Passwords do not match");
        }

        var user = new User{
            Name = signUpUser.Name,
            Surname = signUpUser.Surname,
            Age = signUpUser.Age,
            Email = signUpUser.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(signUpUser.Password),
            Role = "appuser"
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        var student = new Student
        {
            UserId = user.Id,
            GroupId = null
        };

        await _context.Students.AddAsync(student);
        await _context.SaveChangesAsync();

        return student;
    }

    public async Task DeleteStudentAsync(string email)
    {
        var student = await _context.Students.FirstOrDefaultAsync(e => e.User.Email == email);
        if (student == null) throw new ArgumentException("Student not found");

        var user = await _context.Users.FindAsync(student.UserId);
        if (user != null)
        {
            _context.Users.Remove(user);
        }

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
    }

     public async Task<Student> UpdateStudentAsync(string email, EditUser student)
    {
        var existingStudent = await _context.Students.Include(s => s.User)
                                                    .FirstOrDefaultAsync(e => e.User.Email == email);
        if (existingStudent == null) throw new ArgumentException("Student not found");

        existingStudent.User.Name = student.Name;
        existingStudent.User.Surname = student.Surname;

        await _context.SaveChangesAsync();
        return existingStudent;
    }


    public async Task<List<Student>> GetAllStudentsAsync()
    {
        return await _context.Students.Include(s => s.User).ToListAsync();
    }

}