package StudentManagementSystem.sms.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import StudentManagementSystem.sms.DTO.student.StudentRequestDto;
import StudentManagementSystem.sms.DTO.student.StudentResponseDto;
import StudentManagementSystem.sms.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    /*--------------------------------------------------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public StudentResponseDto addStudent(
            @Valid @RequestBody StudentRequestDto request) {

        return studentService.addStudent(request);
    }

    /*--------------------------------------------------------------*/

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping
    public List<StudentResponseDto> getAllStudents() {

        return studentService.getAllStudents();
    }

    /*--------------------------------------------------------------*/

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping("/{id}")
    public StudentResponseDto getStudentById(
            @PathVariable Long id) {

        return studentService.getStudentById(id);
    }

    /*--------------------------------------------------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public StudentResponseDto updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequestDto request) {

        return studentService.updateStudent(id, request);
    }

    /*--------------------------------------------------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id) {

        return studentService.deleteStudent(id);
    }

    /*--------------------------------------------------------------*/

    @GetMapping("/me")
    public StudentResponseDto getMyProfile() {

        return studentService.getMyProfile();
    }

    /*--------------------------------------------------------------*/

    @GetMapping("/count")
    public Long totalStudents() {

        return studentService.totalStudents();

    }

    /*--------------------------------------------------------------*/

    @GetMapping("/active-count")
    public Long activeStudents() {
        return studentService.activeStudents();
    }

    /*--------------------------------------------------------------*/

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping("/search")
    public List<StudentResponseDto> searchStudents(
            @RequestParam String keyword) {

        return studentService.searchStudents(keyword);

    }

}