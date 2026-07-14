package StudentManagementSystem.sms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import StudentManagementSystem.sms.entity.SubjectEntity;

public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {

    boolean existsBySubjectName(String subjectName);

    boolean existsBySubjectCode(String subjectCode);

    List<SubjectEntity> findByTeacherId(Long teacherId);


}
