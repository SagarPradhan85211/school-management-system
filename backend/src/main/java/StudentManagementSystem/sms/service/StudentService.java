package StudentManagementSystem.sms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import StudentManagementSystem.sms.DTO.student.StudentRequestDto;
import StudentManagementSystem.sms.DTO.student.StudentResponseDto;
import StudentManagementSystem.sms.entity.SchoolClassEntity;
import StudentManagementSystem.sms.entity.StudentEntity;
import StudentManagementSystem.sms.entity.UserEntity;
import StudentManagementSystem.sms.enums.Role;
import StudentManagementSystem.sms.enums.StudentStatus;
import StudentManagementSystem.sms.exception.DuplicateResourceException;
import StudentManagementSystem.sms.exception.ResourceNotFoundException;
import StudentManagementSystem.sms.repository.SchoolClassRepository;
import StudentManagementSystem.sms.repository.AttendanceRepository;
import StudentManagementSystem.sms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final SchoolClassRepository classRepository;
    private final AttendanceRepository attendanceRepository;
    private final UserService userService;
    private final CurrentUserService currentUserService;

    /*--------------------------------------------------------------*/

    private StudentEntity toEntity(StudentRequestDto dto) {

        StudentEntity student = new StudentEntity();

        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setRollNumber(dto.getRollNumber());
        student.setGender(dto.getGender());
        student.setDob(dto.getDob());
        student.setAddress(dto.getAddress());
        student.setAdmissionDate(dto.getAdmissionDate());
        student.setStatus(dto.getStatus());

        return student;
    }

    /*--------------------------------------------------------------*/

    private StudentResponseDto toResponseDto(StudentEntity student) {

        StudentResponseDto dto = new StudentResponseDto();

        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setUsername(student.getUser().getUsername());
        dto.setEmail(student.getEmail());
        dto.setPhone(student.getPhone());
        dto.setRollNumber(student.getRollNumber());
        dto.setGender(student.getGender());
        dto.setDob(student.getDob());
        dto.setAddress(student.getAddress());
        dto.setAdmissionDate(student.getAdmissionDate());
        dto.setStatus(student.getStatus());
        dto.setClassId(student.getSchoolClass().getId());

        dto.setClassName(student.getSchoolClass().getClassName());

        dto.setSection(student.getSchoolClass().getSection());

        return dto;
    }

    /*--------------------------------------------------------------*/

    public StudentResponseDto addStudent(StudentRequestDto request) {

        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new DuplicateResourceException("Password is required");
        }

        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (studentRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

        if (studentRepository.existsByRollNumberAndSchoolClassId(
                request.getRollNumber(),
                request.getClassId())) {

            throw new DuplicateResourceException(
                    "Roll Number already exists in this class");
        }

        SchoolClassEntity schoolClass = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        UserEntity user = userService.createUser(
                request.getUsername(),
                request.getPassword(),
                Role.STUDENT);

        StudentEntity student = toEntity(request);

        student.setSchoolClass(schoolClass);
        student.setUser(user);

        StudentEntity savedStudent = studentRepository.save(student);

        return toResponseDto(savedStudent);
    }

    /*--------------------------------------------------------------*/

    public List<StudentResponseDto> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());

    }

    /*--------------------------------------------------------------*/

    public StudentResponseDto getStudentById(Long id) {

        StudentEntity student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));

        return toResponseDto(student);
    }

    /*--------------------------------------------------------------*/

    public StudentResponseDto updateStudent(Long id, StudentRequestDto request) {

        StudentEntity student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));

        // Duplicate Email
        if (!student.getEmail().equals(request.getEmail())
                && studentRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException("Email already exists");
        }

        // Duplicate Phone
        if (!student.getPhone().equals(request.getPhone())
                && studentRepository.existsByPhone(request.getPhone())) {

            throw new DuplicateResourceException("Phone already exists");
        }

        // Duplicate Roll Number
        if (studentRepository.existsByRollNumberAndSchoolClassIdAndIdNot(
                request.getRollNumber(),
                request.getClassId(),
                id)) {

            throw new DuplicateResourceException(
                    "Roll Number already exists in this class");
        }

        SchoolClassEntity schoolClass = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setRollNumber(request.getRollNumber());
        student.setGender(request.getGender());
        student.setDob(request.getDob());
        student.setAddress(request.getAddress());
        student.setAdmissionDate(request.getAdmissionDate());
        student.setStatus(request.getStatus());

        student.setSchoolClass(schoolClass);

        // Update Username
        if (!student.getUser().getUsername().equals(request.getUsername())
                && userService.existsByUsername(request.getUsername())) {

            throw new DuplicateResourceException("Username Already Exists");
        }

        student.getUser().setUsername(request.getUsername());

        userService.saveUser(student.getUser());

        // Update Password only if entered
        if (request.getPassword() != null &&
                !request.getPassword().isBlank()) {

            userService.updatePassword(
                    student.getUser(),
                    request.getPassword());

        }

        StudentEntity updatedStudent = studentRepository.save(student);

        return toResponseDto(updatedStudent);
    }
    /*--------------------------------------------------------------*/

    @Transactional
    public String deleteStudent(Long id) {

        StudentEntity student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));

        // Attendance rows reference the student, so remove them before the profile.
        attendanceRepository.deleteByStudentId(student.getId());
        UserEntity user = student.getUser();
        studentRepository.delete(student);
        userService.deleteUser(user);

        return "Student Deleted Successfully";
    }

    /*--------------------------------------------------------------*/
    public StudentResponseDto getMyProfile() {

        StudentEntity student = currentUserService.getLoggedInStudent();

        return toResponseDto(student);
    }

    /*--------------------------------------------------------------*/

    public Long totalStudents() {

        return studentRepository.count();

    }

    /*--------------------------------------------------------------*/

    public Long activeStudents() {
        return studentRepository.countByStatus(StudentStatus.ACTIVE);
    }

    /*--------------------------------------------------------------*/

    public List<StudentResponseDto> searchStudents(String keyword) {

        return studentRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrRollNumberContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        keyword,
                        keyword)
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());

    }

}
