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

    public async Task<Teacher> AddTeacherAsync(Teacher teacher)
    {
        _context.Teachers.Add(teacher);
        await _context.SaveChangesAsync();
        return teacher;
    }

    public async Task DeleteTeacherAsync(Guid id)
    {
        var teacher = await _context.Teachers.FindAsync(id);
        if (teacher != null) {
            _context.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<Teacher>> GetAllTeachersAsync()
    {
        return await _context.Teachers.Include(s => s.User).ToListAsync();
    }

    public async Task UpdateTeacherAsync(Guid id, Teacher teacher)
    {
        var foundTeacher = await _context.Teachers.FindAsync(id);
        if (foundTeacher != null) {
            foundTeacher.UserId = teacher.UserId;
            await _context.SaveChangesAsync();
        }
    }
}

