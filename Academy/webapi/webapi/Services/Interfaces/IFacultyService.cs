using webapi.Models;

namespace webapi.Services.Interfaces;

public interface IFacultyService {
    public Task<Faculty> CreateFacultyAsync(Faculty faculty);
    public Task<List<Faculty>> GetAllFacultiesAsync();
    public Task DeleteFacultyAsync(string name);
    public Task EditFacultyAsync(string name, Faculty faculty);
    public Task AddGroupToFacultyAsync(string facultyName, string groupName);
    public Task DeleteGroupFromFaculty(string groupName);
}