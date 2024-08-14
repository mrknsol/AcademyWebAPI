using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.Interfaces;

namespace webapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeacherController : ControllerBase {
    
    private readonly ITeacherService _teacherService;

    public TeacherController( ITeacherService teacherService) {
        _teacherService = teacherService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTeachers() {
        var teachers = await _teacherService.GetAllTeachersAsync();
        return Ok(teachers);
    }

    [Authorize(Roles = "appadmin")]
    [HttpPost]
    public async Task<IActionResult> AddTeacher([FromBody] Teacher teacher) {
        var newTeacher = await _teacherService.AddTeacherAsync(teacher);
        return CreatedAtAction(nameof(GetAllTeachers), new {id = newTeacher.Id}, newTeacher);
    }

    [Authorize(Roles = "appadmin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeacher(Guid id) {
        await _teacherService.DeleteTeacherAsync(id);
        return NoContent();
    }

    [Authorize(Roles = "appadmin")]
    [HttpPut]
    public async Task<IActionResult> UpdateTeacher(Guid id, [FromBody] Teacher teacher) {
        await _teacherService.UpdateTeacherAsync(id, teacher);
        return NoContent();
    }

}