using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.Interfaces;

namespace webapi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class TeachersController : ControllerBase {
    
    private readonly ITeacherService _teacherService;

    public TeachersController( ITeacherService teacherService) {
        _teacherService = teacherService;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetAllTeachers() {
        var teachers = await _teacherService.GetAllTeachersAsync();
        return Ok(teachers);
    }

    [Authorize(Roles = "appadmin")]
    [HttpPost("Add")]
    public async Task<IActionResult> AddTeacher([FromBody] SignUpUser teacher) {
        var newTeacher = await _teacherService.AddTeacherAsync(teacher);
        return Ok(newTeacher);
    }

    [Authorize(Roles = "appadmin")]
    [HttpDelete("Delete")]
    public async Task<IActionResult> DeleteTeacher([FromQuery] string email) {
        await _teacherService.DeleteTeacherAsync(email);
        return NoContent();
    }

    [Authorize(Roles = "appadmin")]
    [HttpPut("Edit")]
    public async Task<IActionResult> UpdateTeacher([FromQuery] string email, [FromBody] EditUser teacher) {
        if (teacher == null)
        {
            return BadRequest("Teacher data is required");
        }
        try
        {
            await _teacherService.UpdateTeacherAsync(email, teacher);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

}