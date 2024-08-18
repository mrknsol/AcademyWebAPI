using webapi.Models;
using webapi.Context;
using webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using webapi.Models.DTOes;

namespace webapi.Services.Classes;

public class GroupService : IGroupService
{
    private readonly AcademyContext _context;

    public GroupService(AcademyContext context)
    {
        _context = context;
    }

    public async Task<Group> CreateGroupAsync(CreateGroup group)
    {
        var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.User.Email == group.TeacherEmail);
        var newGroup = new Group{
            Name = group.Name,
            countOfStudents = group.CountOfStudents,
            TeacherId = teacher.Id
        };

        await _context.Groups.AddAsync(newGroup);
        await _context.SaveChangesAsync();

        return newGroup;
    }

    public async Task DeleteGroupAsync(string name)
    {
        var group = await _context.Groups.FirstOrDefaultAsync(e => e.Name == name);
        if (group == null) throw new ArgumentException("Student not found");

        _context.Groups.Remove(group);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Group>> GetAllGroupsAsync()
    {
        return await _context.Groups.Include(g => g.Teacher).ThenInclude(t => t.User).ToListAsync();
    }

    public async Task UpdateGroupAsync(string name , CreateGroup group)
    {
         var existingGroup = await _context.Groups.FirstOrDefaultAsync(e => e.Name == name);
        if (existingGroup == null) throw new ArgumentException("Group not found");

        existingGroup.Name = group.Name;
        existingGroup.countOfStudents = group.CountOfStudents;

        await _context.SaveChangesAsync();
    }
    public async Task ChangeTeacherAsync(string groupName, string newTeacherEmail)
    {
        var group = await _context.Groups
            .FirstOrDefaultAsync(g => g.Name == groupName);
        var teacher = await _context.Teachers
            .FirstOrDefaultAsync(t => t.User.Email == newTeacherEmail);

        if (group == null) throw new ArgumentException("Group not found");

        group.TeacherId = teacher.Id;

        await _context.SaveChangesAsync();
    }
    public async Task AddStudentToGroupAsync(string groupName, Student student)
    {
        var group = await _context.Groups
            .Include(g => g.Students) 
            .FirstOrDefaultAsync(g => g.Id == groupName);

        if (group == null) throw new ArgumentException("Group not found");

        student.GroupId = groupName; 
        group.Students.Add(student);

        await _context.SaveChangesAsync();
    }
    public async Task RemoveStudentFromGroupAsync(string groupName, string studentMail)
    {
        var group = await _context.Groups
            .Include(g => g.Students)
            .FirstOrDefaultAsync(g => g.Id == groupName);

        if (group == null) throw new ArgumentException("Group not found");

        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.User.Email == studentMail && s.Group.Name == groupName);

        if (student != null)
        {
            group.Students.Remove(student);
            student.GroupId = null;

            _context.Students.Update(student);
            await _context.SaveChangesAsync();
        }
    }
}