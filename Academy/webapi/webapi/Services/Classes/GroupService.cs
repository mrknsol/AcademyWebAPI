using webapi.Models;
using webapi.Context;
using webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace webapi.Services.Classes;

public class GroupService : IGroupService
{
    private readonly AcademyContext _context;

    public GroupService(AcademyContext context)
    {
        _context = context;
    }

    public async Task<Group> CreateGroupAsync(Group group)
    {
        _context.Groups.Add(group);
        await _context.SaveChangesAsync();
        return group;
    }

    public async Task DeleteGroupAsync(string name)
    {
        var group = await _context.Groups.FindAsync(name);
        if (group != null) 
        {
            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<Group>> GetAllGroupsAsync()
    {
        return await _context.Groups.ToListAsync();
    }

    public async Task UpdateGroupAsync(string name , Group group)
    {
         var existingGroup = await _context.Groups.FirstOrDefaultAsync(e => e.Name == name);
        if (existingGroup == null) throw new ArgumentException("Group not found");

        existingGroup.Name = group.Name;

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