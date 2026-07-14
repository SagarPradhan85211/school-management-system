package StudentManagementSystem.sms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import StudentManagementSystem.sms.entity.SchoolClassEntity;

public interface SchoolClassRepository
        extends JpaRepository<SchoolClassEntity, Long> {

    boolean existsByClassNameAndSectionAndAcademicYear(
            Integer className,
            String section,
            String academicYear);

    long count();

}