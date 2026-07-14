package StudentManagementSystem.sms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import StudentManagementSystem.sms.DTO.subject.SubjectRequestDto;
import StudentManagementSystem.sms.DTO.subject.SubjectResponseDto;
import StudentManagementSystem.sms.entity.SchoolClassEntity;
import StudentManagementSystem.sms.entity.SubjectEntity;
import StudentManagementSystem.sms.entity.TeacherEntity;
import StudentManagementSystem.sms.exception.DuplicateResourceException;
import StudentManagementSystem.sms.exception.ResourceNotFoundException;
import StudentManagementSystem.sms.repository.SchoolClassRepository;
import StudentManagementSystem.sms.repository.AttendanceRepository;
import StudentManagementSystem.sms.repository.SubjectRepository;
import StudentManagementSystem.sms.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final TeacherRepository teacherRepository;
    private final SchoolClassRepository classRepository;
    private final CurrentUserService currentUserService;
    private final AttendanceRepository attendanceRepository;

    /*-------------------------------------------------------*/

    private SubjectEntity toEntity(SubjectRequestDto dto) {

        SubjectEntity subject = new SubjectEntity();

        subject.setSubjectName(dto.getSubjectName());
        subject.setSubjectCode(dto.getSubjectCode());
        subject.setCredits(dto.getCredits());
        subject.setStatus(dto.getStatus());

        return subject;
    }

    /*-------------------------------------------------------*/

    private SubjectResponseDto toResponseDto(SubjectEntity subject) {

        SubjectResponseDto dto = new SubjectResponseDto();

        dto.setId(subject.getId());
        dto.setSubjectName(subject.getSubjectName());
        dto.setSubjectCode(subject.getSubjectCode());
        dto.setCredits(subject.getCredits());
        dto.setStatus(subject.getStatus());

        dto.setTeacherId(subject.getTeacher().getId());
        dto.setTeacherName(
                subject.getTeacher().getFirstName() + " "
                        + subject.getTeacher().getLastName());

        dto.setClassId(subject.getSchoolClass().getId());

        dto.setClassName(subject.getSchoolClass().getClassName());

        dto.setSection(subject.getSchoolClass().getSection());

        return dto;
    }

    /*-------------------------------------------------------*/

    public SubjectResponseDto addSubject(SubjectRequestDto request) {

        if (subjectRepository.existsBySubjectName(request.getSubjectName())) {
            throw new DuplicateResourceException("Subject Name already exists");
        }

        if (subjectRepository.existsBySubjectCode(request.getSubjectCode())) {
            throw new DuplicateResourceException("Subject Code already exists");
        }

        TeacherEntity teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher Not Found"));

        SchoolClassEntity schoolClass = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        validateTeacherClassAssignment(teacher, schoolClass);

        SubjectEntity subject = toEntity(request);

        subject.setSchoolClass(schoolClass);

        subject.setTeacher(teacher);

        SubjectEntity savedSubject = subjectRepository.save(subject);

        return toResponseDto(savedSubject);
    }

    /*-------------------------------------------------------*/

    public List<SubjectResponseDto> getAllSubjects() {

        List<SubjectEntity> subjects = currentUserService.getLoggedInUser().getRole().name().equals("TEACHER")
                ? subjectRepository.findByTeacherId(currentUserService.getLoggedInTeacher().getId())
                : subjectRepository.findAll();

        return subjects
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    /*-------------------------------------------------------*/

    public SubjectResponseDto getSubjectById(Long id) {

        SubjectEntity subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject Not Found"));

        return toResponseDto(subject);
    }

    /*-------------------------------------------------------*/

    public SubjectResponseDto updateSubject(Long id,
            SubjectRequestDto request) {

        SubjectEntity subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject Not Found"));

        TeacherEntity teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher Not Found"));

        SchoolClassEntity schoolClass = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        validateTeacherClassAssignment(teacher, schoolClass);

        subject.setSubjectName(request.getSubjectName());
        subject.setSubjectCode(request.getSubjectCode());
        subject.setCredits(request.getCredits());
        subject.setStatus(request.getStatus());
        subject.setTeacher(teacher);
        subject.setSchoolClass(schoolClass);

        SubjectEntity updatedSubject = subjectRepository.save(subject);

        return toResponseDto(updatedSubject);
    }

    /*-------------------------------------------------------*/

    @Transactional
    public String deleteSubject(Long id) {

        SubjectEntity subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject Not Found"));

        attendanceRepository.deleteBySubjectId(subject.getId());
        subjectRepository.delete(subject);

        return "Subject Deleted Successfully";
    }

    private void validateTeacherClassAssignment(TeacherEntity teacher, SchoolClassEntity schoolClass) {
        if (!teacher.getSchoolClass().getId().equals(schoolClass.getId())) {
            throw new DuplicateResourceException("A subject must be assigned to the teacher's class.");
        }
    }
}
