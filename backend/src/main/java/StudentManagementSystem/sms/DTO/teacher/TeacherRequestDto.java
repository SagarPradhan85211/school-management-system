package StudentManagementSystem.sms.DTO.teacher;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.Gender;
import StudentManagementSystem.sms.enums.TeacherStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherRequestDto {

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone Number must be 10 digits")
    private String phone;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dob;

    @NotBlank(message = "Qualification is required")
    private String qualification;

    @NotNull(message = "Experience is required")
    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be greater than 0")
    private Double salary;

    @NotNull(message = "Joining Date is required")
    private LocalDate joiningDate;

    @NotNull(message = "Status is required")
    private TeacherStatus status;

    @NotNull(message = "Class is required")
    private Long classId;

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;
}