package StudentManagementSystem.sms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import StudentManagementSystem.sms.entity.TeacherEntity;
import StudentManagementSystem.sms.entity.UserEntity;

public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<TeacherEntity> findByUser(UserEntity user);

    long count();

}