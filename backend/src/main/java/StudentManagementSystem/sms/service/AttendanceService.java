package StudentManagementSystem.sms.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import StudentManagementSystem.sms.DTO.attendance.AttendanceRequestDto;
import StudentManagementSystem.sms.DTO.attendance.AttendanceResponseDto;
import StudentManagementSystem.sms.DTO.attendance.StudentAttendanceDto;
import StudentManagementSystem.sms.entity.AttendanceEntity;
import StudentManagementSystem.sms.entity.StudentEntity;
import StudentManagementSystem.sms.entity.SubjectEntity;
import StudentManagementSystem.sms.entity.TeacherEntity;
import StudentManagementSystem.sms.enums.AttendanceStatus;
import StudentManagementSystem.sms.enums.Role;
import StudentManagementSystem.sms.exception.DuplicateResourceException;
import StudentManagementSystem.sms.exception.ResourceNotFoundException;
import StudentManagementSystem.sms.exception.UnauthorizedException;
import StudentManagementSystem.sms.repository.AttendanceRepository;
import StudentManagementSystem.sms.repository.StudentRepository;
import StudentManagementSystem.sms.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;
    private final CurrentUserService currentUserService;

    @Transactional
    public List<AttendanceResponseDto> markAttendance(AttendanceRequestDto request) {
        TeacherEntity teacher = currentUserService.getLoggedInTeacher();
        SubjectEntity subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject Not Found"));

        if (!subject.getTeacher().getId().equals(teacher.getId())) {
            throw new UnauthorizedException("You can only mark attendance for subjects assigned to you.");
        }

        List<AttendanceResponseDto> responseList = new ArrayList<>();
        for (StudentAttendanceDto dto : request.getStudents()) {
            StudentEntity student = studentRepository.findById(dto.getStudentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));

            if (!student.getSchoolClass().getId().equals(teacher.getSchoolClass().getId())) {
                throw new UnauthorizedException("You can only mark attendance for students in your assigned class.");
            }

            if (attendanceRepository.existsByStudentIdAndSubjectIdAndAttendanceDate(
                    student.getId(), subject.getId(), request.getAttendanceDate())) {
                throw new DuplicateResourceException(
                        "Attendance already marked for " + student.getFirstName());
            }

            AttendanceEntity attendance = new AttendanceEntity();
            attendance.setStudent(student);
            attendance.setTeacher(teacher);
            attendance.setSubject(subject);
            attendance.setAttendanceDate(request.getAttendanceDate());
            attendance.setStatus(dto.getStatus());
            responseList.add(toResponseDto(attendanceRepository.save(attendance)));
        }
        return responseList;
    }

    public List<AttendanceResponseDto> getAttendanceByDate(LocalDate date) {
        if (currentUserService.getLoggedInUser().getRole() == Role.TEACHER) {
            TeacherEntity teacher = currentUserService.getLoggedInTeacher();
            return attendanceRepository.findByTeacherIdAndAttendanceDate(teacher.getId(), date)
                    .stream().map(this::toResponseDto).toList();
        }
        return attendanceRepository.findByAttendanceDate(date)
                .stream().map(this::toResponseDto).toList();
    }

    public AttendanceResponseDto getAttendanceById(Long id) {
        AttendanceEntity attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance Not Found"));
        ensureTeacherOwnsAttendance(attendance);
        return toResponseDto(attendance);
    }

    public List<AttendanceResponseDto> getAttendanceByStudent(Long studentId) {
        StudentEntity student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));
        Role role = currentUserService.getLoggedInUser().getRole();

        if (role == Role.STUDENT && !currentUserService.getLoggedInStudent().getId().equals(studentId)) {
            throw new UnauthorizedException("You can only view your own attendance.");
        }
        if (role == Role.TEACHER && !currentUserService.getLoggedInTeacher().getSchoolClass().getId()
                .equals(student.getSchoolClass().getId())) {
            throw new UnauthorizedException("You can only view attendance for your assigned class.");
        }
        return attendanceRepository.findByStudentId(studentId)
                .stream().map(this::toResponseDto).toList();
    }

    public AttendanceResponseDto updateAttendance(Long id, AttendanceStatus status) {
        AttendanceEntity attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance Not Found"));
        ensureTeacherOwnsAttendance(attendance);
        attendance.setStatus(status);
        return toResponseDto(attendanceRepository.save(attendance));
    }

    public void deleteAttendance(Long id) {
        AttendanceEntity attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance Not Found"));
        attendanceRepository.delete(attendance);
    }

    private void ensureTeacherOwnsAttendance(AttendanceEntity attendance) {
        if (currentUserService.getLoggedInUser().getRole() == Role.TEACHER
                && !attendance.getTeacher().getId().equals(currentUserService.getLoggedInTeacher().getId())) {
            throw new UnauthorizedException("You can only access attendance you recorded.");
        }
    }

    private AttendanceResponseDto toResponseDto(AttendanceEntity attendance) {
        AttendanceResponseDto dto = new AttendanceResponseDto();
        dto.setId(attendance.getId());
        dto.setStudentName(attendance.getStudent().getFirstName() + " " + attendance.getStudent().getLastName());
        dto.setSubjectName(attendance.getSubject().getSubjectName());
        dto.setAttendanceDate(attendance.getAttendanceDate());
        dto.setStatus(attendance.getStatus());
        return dto;
    }
}
