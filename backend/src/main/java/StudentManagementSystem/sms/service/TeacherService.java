
package StudentManagementSystem.sms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import StudentManagementSystem.sms.DTO.teacher.TeacherRequestDto;
import StudentManagementSystem.sms.DTO.teacher.TeacherResponseDto;
import StudentManagementSystem.sms.entity.SchoolClassEntity;
import StudentManagementSystem.sms.entity.TeacherEntity;
import StudentManagementSystem.sms.entity.UserEntity;
import StudentManagementSystem.sms.enums.Role;
import StudentManagementSystem.sms.exception.DuplicateResourceException;
import StudentManagementSystem.sms.exception.ResourceNotFoundException;
import StudentManagementSystem.sms.repository.SchoolClassRepository;
import StudentManagementSystem.sms.repository.AttendanceRepository;
import StudentManagementSystem.sms.repository.SubjectRepository;
import StudentManagementSystem.sms.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final SchoolClassRepository classRepository;
    private final SubjectRepository subjectRepository;
    private final AttendanceRepository attendanceRepository;
    private final UserService userService;
    private final CurrentUserService currentUserService;

    /*-------------------------------------------------------------*/

    private TeacherEntity toEntity(TeacherRequestDto dto) {

        TeacherEntity teacher = new TeacherEntity();

        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setEmail(dto.getEmail());
        teacher.setPhone(dto.getPhone());
        teacher.setGender(dto.getGender());
        teacher.setDob(dto.getDob());
        teacher.setQualification(dto.getQualification());
        teacher.setExperience(dto.getExperience());
        teacher.setSalary(dto.getSalary());
        teacher.setJoiningDate(dto.getJoiningDate());
        teacher.setStatus(dto.getStatus());

        return teacher;
    }

    /*-------------------------------------------------------------*/

    private TeacherResponseDto toResponseDto(TeacherEntity teacher) {

        TeacherResponseDto dto = new TeacherResponseDto();

        dto.setId(teacher.getId());
        dto.setFirstName(teacher.getFirstName());
        dto.setLastName(teacher.getLastName());
        dto.setUsername(teacher.getUser().getUsername());
        dto.setEmail(teacher.getEmail());
        dto.setPhone(teacher.getPhone());
        dto.setGender(teacher.getGender());
        dto.setDob(teacher.getDob());
        dto.setQualification(teacher.getQualification());
        dto.setExperience(teacher.getExperience());
        dto.setSalary(teacher.getSalary());
        dto.setJoiningDate(teacher.getJoiningDate());
        dto.setStatus(teacher.getStatus());

        dto.setClassId(teacher.getSchoolClass().getId());
        dto.setClassName(teacher.getSchoolClass().getClassName());
        dto.setSection(teacher.getSchoolClass().getSection());

        return dto;
    }

    /*-------------------------------------------------------------*/

    public TeacherResponseDto addTeacher(TeacherRequestDto request) {

        if (teacherRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (teacherRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

        UserEntity user = userService.createUser(
                request.getUsername(),
                request.getPassword(),
                Role.TEACHER);

        SchoolClassEntity schoolClass = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        TeacherEntity teacher = toEntity(request);

        teacher.setUser(user);

        teacher.setSchoolClass(schoolClass);

        TeacherEntity savedTeacher = teacherRepository.save(teacher);

        return toResponseDto(savedTeacher);
    }

    /*-------------------------------------------------------------*/

    public List<TeacherResponseDto> getAllTeachers() {

        return teacherRepository.findAll()
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    /*-------------------------------------------------------------*/

    public TeacherResponseDto getTeacherById(Long id) {

        TeacherEntity teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher Not Found"));

        return toResponseDto(teacher);
    }

    /*-------------------------------------------------------------*/

    public TeacherResponseDto updateTeacher(Long id, TeacherRequestDto request) {

        TeacherEntity teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher Not Found"));

        SchoolClassEntity schoolClass = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        teacher.setFirstName(request.getFirstName());
        teacher.setLastName(request.getLastName());
        teacher.setEmail(request.getEmail());
        teacher.setPhone(request.getPhone());
        teacher.setGender(request.getGender());
        teacher.setDob(request.getDob());
        teacher.setQualification(request.getQualification());
        teacher.setExperience(request.getExperience());
        teacher.setSalary(request.getSalary());
        teacher.setJoiningDate(request.getJoiningDate());
        teacher.setStatus(request.getStatus());
        teacher.setSchoolClass(schoolClass);

        TeacherEntity updatedTeacher = teacherRepository.save(teacher);

        return toResponseDto(updatedTeacher);
    }

    /*-------------------------------------------------------------*/

    @Transactional
    public String deleteTeacher(Long id) {

        TeacherEntity teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher Not Found"));

        // Delete dependent attendance and subjects before removing the teacher profile.
        attendanceRepository.deleteByTeacherId(teacher.getId());
        subjectRepository.deleteAll(subjectRepository.findByTeacherId(teacher.getId()));
        UserEntity user = teacher.getUser();
        teacherRepository.delete(teacher);
        userService.deleteUser(user);

        return "Teacher Deleted Successfully";
    }

    public TeacherResponseDto getMyProfile() {

        TeacherEntity teacher = currentUserService.getLoggedInTeacher();

        return toResponseDto(teacher);
    }

    public Long totalTeachers() {

        return teacherRepository.count();

    }

}
