
package StudentManagementSystem.sms.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import StudentManagementSystem.sms.DTO.teacher.TeacherRequestDto;
import StudentManagementSystem.sms.DTO.teacher.TeacherResponseDto;
import StudentManagementSystem.sms.service.TeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public TeacherResponseDto addTeacher(
            @Valid @RequestBody TeacherRequestDto request) {

        return teacherService.addTeacher(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<TeacherResponseDto> getAllTeachers() {

        return teacherService.getAllTeachers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public TeacherResponseDto getTeacherById(
            @PathVariable Long id) {

        return teacherService.getTeacherById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public TeacherResponseDto updateTeacher(
            @PathVariable Long id,
            @Valid @RequestBody TeacherRequestDto request) {

        return teacherService.updateTeacher(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteTeacher(
            @PathVariable Long id) {

        return teacherService.deleteTeacher(id);
    }

    @GetMapping("/me")
    public TeacherResponseDto getMyProfile() {

        return teacherService.getMyProfile();
    }

    @GetMapping("/count")
    public Long totalTeachers() {

        return teacherService.totalTeachers();

    }
}
