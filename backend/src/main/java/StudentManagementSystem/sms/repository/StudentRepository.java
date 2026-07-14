package StudentManagementSystem.sms.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import StudentManagementSystem.sms.entity.StudentEntity;
import StudentManagementSystem.sms.entity.UserEntity;
import StudentManagementSystem.sms.enums.StudentStatus;



@Repository
public interface StudentRepository extends JpaRepository<StudentEntity ,Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByRollNumber(String rollNumber);
     
    Optional<StudentEntity> findByUser(UserEntity user);

    long count();

    long countByStatus(StudentStatus status);

    List<StudentEntity> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrRollNumberContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(
        String firstName,
        String lastName,
        String rollNumber,
        String email,
        String phone);

    boolean existsByRollNumberAndSchoolClassId(
        String rollNumber,
        Long schoolClassId);

    boolean existsByRollNumberAndSchoolClassIdAndIdNot(
        String rollNumber,
        Long schoolClassId,
        Long id);

    
}
