using webapi.Models;

namespace webapi.Services.Interfaces;

public interface ITeacherService {
    public Task<List<Teacher>> GetAllTeachersAsync();
    public Task<Teacher> AddTeacherAsync(SignUpUser teacher);
    public Task DeleteTeacherAsync(string email);
    public Task<Teacher> UpdateTeacherAsync(string email, EditUser teacher);
}