package StudentManagementSystem.sms.DTO.student;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.Gender;
import StudentManagementSystem.sms.enums.StudentStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentResponseDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String rollNumber;

    private Gender gender;

    private LocalDate dob;

    private String address;

    private LocalDate admissionDate;

    private StudentStatus status;

    private Long classId;

    private Integer className;

    private String section;

    private String username;

}