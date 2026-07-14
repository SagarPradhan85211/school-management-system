package StudentManagementSystem.sms.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import StudentManagementSystem.sms.entity.StudentEntity;
import StudentManagementSystem.sms.entity.TeacherEntity;
import StudentManagementSystem.sms.entity.UserEntity;
import StudentManagementSystem.sms.repository.StudentRepository;
import StudentManagementSystem.sms.repository.TeacherRepository;
import StudentManagementSystem.sms.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    /*---------------------------------------------------------*/

    public UserEntity getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
    }

    /*---------------------------------------------------------*/

    public TeacherEntity getLoggedInTeacher() {

        UserEntity user = getLoggedInUser();

        return teacherRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Teacher Not Found"));
    }

    /*---------------------------------------------------------*/

    public StudentEntity getLoggedInStudent() {

        UserEntity user = getLoggedInUser();

        return studentRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));
    }

}