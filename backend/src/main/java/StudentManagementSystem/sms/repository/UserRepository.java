package StudentManagementSystem.sms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import StudentManagementSystem.sms.entity.UserEntity;
import StudentManagementSystem.sms.enums.Role;


public interface UserRepository extends JpaRepository<UserEntity,Long> {
    
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByRole(Role admin);
    
}
