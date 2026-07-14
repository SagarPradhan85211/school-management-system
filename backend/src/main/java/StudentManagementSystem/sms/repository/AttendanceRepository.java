package StudentManagementSystem.sms.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import StudentManagementSystem.sms.entity.AttendanceEntity;

public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Long> {

    boolean existsByStudentIdAndSubjectIdAndAttendanceDate(
            Long studentId,
            Long subjectId,
            LocalDate attendanceDate);

    List<AttendanceEntity> findByStudentId(Long studentId);

    List<AttendanceEntity> findByAttendanceDate(LocalDate attendanceDate);

    List<AttendanceEntity> findByTeacherIdAndAttendanceDate(
            Long teacherId,
            LocalDate attendanceDate);

    void deleteByStudentId(Long studentId);

    void deleteByTeacherId(Long teacherId);

    void deleteBySubjectId(Long subjectId);

}
