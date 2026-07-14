package StudentManagementSystem.sms.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import StudentManagementSystem.sms.DTO.attendance.AttendanceRequestDto;
import StudentManagementSystem.sms.DTO.attendance.AttendanceResponseDto;
import StudentManagementSystem.sms.enums.AttendanceStatus;
import StudentManagementSystem.sms.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PreAuthorize("hasAnyRole('TEACHER')")
    @PostMapping
    public List<AttendanceResponseDto> markAttendance(
            @Valid @RequestBody AttendanceRequestDto request) {

        return attendanceService.markAttendance(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping
    public List<AttendanceResponseDto> getAttendanceByDate(
            @RequestParam LocalDate date) {

        return attendanceService.getAttendanceByDate(date);
    }

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping("/{id}")
    public AttendanceResponseDto getAttendanceById(
            @PathVariable Long id) {

        return attendanceService.getAttendanceById(id);
    }

    @GetMapping("/student/{studentId}")
    public List<AttendanceResponseDto> getAttendanceByStudent(
            @PathVariable Long studentId) {

        return attendanceService.getAttendanceByStudent(studentId);
    }

    @PreAuthorize("hasAnyRole('TEACHER')")
    @PutMapping("/{id}")
    public AttendanceResponseDto updateAttendance(
            @PathVariable Long id,
            @RequestParam AttendanceStatus status) {

        return attendanceService.updateAttendance(id, status);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);
    }
}
