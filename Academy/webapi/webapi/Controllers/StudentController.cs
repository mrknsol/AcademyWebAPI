using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using webapi.Models;
using webapi.Services.Interfaces;

namespace webapi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _studentService.GetAllStudentsAsync();
            return Ok(students);
        }

        [Authorize(Roles = "appadmin")]
        [HttpPost("Add")]
        public async Task<IActionResult> AddStudent([FromBody] SignUpUser signUpUser)
        {
            var newStudent = await _studentService.AddStudentAsync(signUpUser);
            return Ok(newStudent);
        }

        [Authorize(Roles = "appadmin")]
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteStudent(string email)
        {
            await _studentService.DeleteStudentAsync(email);
            return NoContent();
        }

        [Authorize(Roles = "appadmin")]
        [HttpPut("Edit")]
        public async Task<IActionResult> EditStudent([FromQuery] string email, [FromBody] EditUser student)
        {
            if (student == null)
            {
                return BadRequest("Student data is required");
            }
            try
            {
                await _studentService.UpdateStudentAsync(email, student);
                return Ok(email);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}