package StudentManagementSystem.sms.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import StudentManagementSystem.sms.DTO.subject.SubjectRequestDto;
import StudentManagementSystem.sms.DTO.subject.SubjectResponseDto;
import StudentManagementSystem.sms.service.SubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SubjectResponseDto addSubject(
            @Valid @RequestBody SubjectRequestDto request) {

        return subjectService.addSubject(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping
    public List<SubjectResponseDto> getAllSubjects() {

        return subjectService.getAllSubjects();
    }

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping("/{id}")
    public SubjectResponseDto getSubjectById(
            @PathVariable Long id) {

        return subjectService.getSubjectById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public SubjectResponseDto updateSubject(
            @PathVariable Long id,
            @Valid @RequestBody SubjectRequestDto request) {

        return subjectService.updateSubject(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteSubject(
            @PathVariable Long id) {

        return subjectService.deleteSubject(id);
    }
}