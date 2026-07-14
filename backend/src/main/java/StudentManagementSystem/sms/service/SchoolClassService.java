package StudentManagementSystem.sms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import StudentManagementSystem.sms.DTO.schoolclass.SchoolClassRequestDto;
import StudentManagementSystem.sms.DTO.schoolclass.SchoolClassResponseDto;
import StudentManagementSystem.sms.entity.SchoolClassEntity;
import StudentManagementSystem.sms.exception.DuplicateResourceException;
import StudentManagementSystem.sms.exception.ResourceNotFoundException;
import StudentManagementSystem.sms.repository.SchoolClassRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SchoolClassService {

    private final SchoolClassRepository repository;

    /*-------------------------------------------------------*/

    private SchoolClassEntity toEntity(SchoolClassRequestDto dto) {

        SchoolClassEntity entity = new SchoolClassEntity();

        entity.setClassName(dto.getClassName());
        entity.setSection(dto.getSection());
        entity.setAcademicYear(dto.getAcademicYear());
        entity.setCapacity(dto.getCapacity());
        entity.setStatus(dto.getStatus());

        return entity;
    }

    /*-------------------------------------------------------*/

    private SchoolClassResponseDto toResponseDto(SchoolClassEntity entity) {

        SchoolClassResponseDto dto = new SchoolClassResponseDto();

        dto.setId(entity.getId());
        dto.setClassName(entity.getClassName());
        dto.setSection(entity.getSection());
        dto.setAcademicYear(entity.getAcademicYear());
        dto.setCapacity(entity.getCapacity());
        dto.setStatus(entity.getStatus());

        return dto;
    }

    /*-------------------------------------------------------*/

    public SchoolClassResponseDto addClass(SchoolClassRequestDto request) {

        if (repository.existsByClassNameAndSectionAndAcademicYear(
                request.getClassName(),
                request.getSection(),
                request.getAcademicYear())) {

            throw new DuplicateResourceException("Class already exists");
        }

        SchoolClassEntity saved = repository.save(toEntity(request));

        return toResponseDto(saved);
    }

    /*-------------------------------------------------------*/

    public List<SchoolClassResponseDto> getAllClasses() {

        return repository.findAll()
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    /*-------------------------------------------------------*/

    public SchoolClassResponseDto getClassById(Long id) {

        SchoolClassEntity entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        return toResponseDto(entity);
    }

    /*-------------------------------------------------------*/

    public SchoolClassResponseDto updateClass(
            Long id,
            SchoolClassRequestDto request) {

        SchoolClassEntity entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        entity.setClassName(request.getClassName());
        entity.setSection(request.getSection());
        entity.setAcademicYear(request.getAcademicYear());
        entity.setCapacity(request.getCapacity());
        entity.setStatus(request.getStatus());

        SchoolClassEntity updated = repository.save(entity);

        return toResponseDto(updated);
    }

    /*-------------------------------------------------------*/

    public String deleteClass(Long id) {

        SchoolClassEntity entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class Not Found"));

        repository.delete(entity);

        return "Class Deleted Successfully";
    }

    /*-------------------------------------------------------*/

    public Long totalClasses() {
        return repository.count();
    }

}