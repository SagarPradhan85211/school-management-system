package StudentManagementSystem.sms.DTO.teacher;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.Gender;
import StudentManagementSystem.sms.enums.TeacherStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherResponseDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Gender gender;

    private LocalDate dob;

    private String qualification;

    private Integer experience;

    private Double salary;

    private LocalDate joiningDate;

    private TeacherStatus status;

    private Long classId;

    private Integer className;

    private String section;

    private String username;
}