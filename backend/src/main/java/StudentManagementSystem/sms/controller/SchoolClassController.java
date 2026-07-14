package StudentManagementSystem.sms.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import StudentManagementSystem.sms.DTO.schoolclass.SchoolClassRequestDto;
import StudentManagementSystem.sms.DTO.schoolclass.SchoolClassResponseDto;
import StudentManagementSystem.sms.service.SchoolClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class SchoolClassController {

    private final SchoolClassService service;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SchoolClassResponseDto addClass(
            @Valid @RequestBody SchoolClassRequestDto request) {

        return service.addClass(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<SchoolClassResponseDto> getAllClasses() {

        return service.getAllClasses();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public SchoolClassResponseDto getClassById(
            @PathVariable Long id) {

        return service.getClassById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public SchoolClassResponseDto updateClass(
            @PathVariable Long id,
            @Valid @RequestBody SchoolClassRequestDto request) {

        return service.updateClass(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteClass(
            @PathVariable Long id) {

        return service.deleteClass(id);
    }

    @GetMapping("/count")
    public Long totalClasses() {
        return service.totalClasses();
    }

}