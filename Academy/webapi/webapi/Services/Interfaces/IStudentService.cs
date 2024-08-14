using webapi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webapi.Services.Interfaces;
public interface IStudentService
{
    public Task<List<Student>> GetAllStudentsAsync();
    public Task<Student> AddStudentAsync(SignUpUser student);
    public Task DeleteStudentAsync(string email);
    public Task UpdateStudentAsync(string email, EditStudent student);
}