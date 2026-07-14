package StudentManagementSystem.sms.DTO.student;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.Gender;
import StudentManagementSystem.sms.enums.StudentStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentRequestDto {

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone Number must be 10 digits")
    private String phone;

    @NotBlank(message = "Roll Number is required")
    private String rollNumber;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dob;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Admission Date is required")
    private LocalDate admissionDate;

    @NotNull(message = "Status is required")
    private StudentStatus status;

    @NotNull(message = "classId is required")
    private Long classId;

    @NotBlank(message = "Username is required")
    private String username;

   
    private String password;

}
