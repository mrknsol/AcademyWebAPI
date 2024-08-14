using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.Interfaces;

namespace webapi.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class GroupController : ControllerBase {
    private readonly IGroupService _groupService;


    public GroupController(IGroupService groupService)
    {
        _groupService = groupService;
    }

    [HttpPost("Create")]
    public async Task<IActionResult> CreateGroup([FromBody] Group group)
    {
        try
        {
            var res = await _groupService.CreateGroupAsync(group);

            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex.Message}\n{ex}");
        }
    }
    [HttpGet("Get")]
    public async Task<IActionResult> GetAllGroups()
    {
        var users = await _groupService.GetAllGroupsAsync();
        return Ok(users);
    }

    [Authorize(Roles = "appadmin")]
    [HttpDelete("Delete")]
    public async Task<IActionResult> DeleteStudent(string email)
    {
        await _groupService.DeleteGroupAsync(email);
        return NoContent();
    }

    [HttpPut("Update")]
    public async Task<IActionResult> UpdateGroups(string email, Group group) {
        await _groupService.UpdateGroupAsync(email, group);
        return Ok(email);
    }

    [HttpPut("ChangeTeacher")]
    public async Task<IActionResult> ChangeTeacher(string groupName, string teacherEmail)
    {
        try
        {
            await _groupService.ChangeTeacherAsync(groupName, teacherEmail);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    [HttpPost("AddStudent")]
    public async Task<IActionResult> AddStudentToGroup(string groupName, [FromBody] Student student)
    {
        if (student == null)
        {
            return BadRequest("Student cannot be null");
        }

        try
        {
            await _groupService.AddStudentToGroupAsync(groupName, student);
            return Ok(student);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("RemoveStudent")]

    public async Task<IActionResult> RemoveStudentFromGroup(string groupName, string studentEmail)
    {
        try
        {
            await _groupService.RemoveStudentFromGroupAsync(groupName, studentEmail);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

}