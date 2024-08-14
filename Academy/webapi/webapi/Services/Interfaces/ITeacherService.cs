using webapi.Models;

namespace webapi.Services.Interfaces;

public interface ITeacherService {
    public Task<List<Teacher>> GetAllTeachersAsync();
    public Task<Teacher> AddTeacherAsync(Teacher teacher);
    public Task DeleteTeacherAsync(Guid id);
    public Task UpdateTeacherAsync(Guid id, Teacher teacher);
}