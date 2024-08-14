using webapi.Models;

namespace webapi.Services.Interfaces;

public interface IGroupService {
    public Task<Group> CreateGroupAsync(Group group);
    public Task<List<Group>> GetAllGroupsAsync();
    public Task DeleteGroupAsync(string name);
    public Task UpdateGroupAsync(string name, Group group);
    public Task AddStudentToGroupAsync (string groupName, Student student);
    public Task RemoveStudentFromGroupAsync(string groupName, string studentMail);
    public Task ChangeTeacherAsync(string groupName, string newTeacherEmail);
}