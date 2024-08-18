using webapi.Models;
using webapi.Models.DTOes;

namespace webapi.Services.Interfaces;

public interface IGroupService {
    public Task<Group> CreateGroupAsync(CreateGroup group);
    public Task<List<Group>> GetAllGroupsAsync();
    public Task DeleteGroupAsync(string name);
    public Task UpdateGroupAsync(string name, CreateGroup group);
    public Task AddStudentToGroupAsync (string groupName, Student student);
    public Task RemoveStudentFromGroupAsync(string groupName, string studentMail);
    public Task ChangeTeacherAsync(string groupName, string newTeacherEmail);
}