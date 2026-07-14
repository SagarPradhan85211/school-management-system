package StudentManagementSystem.sms.DTO.schoolclass;


import StudentManagementSystem.sms.enums.ClassStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolClassRequestDto {

    @NotNull
    private Integer className;

    @NotBlank
    private String section;

    @NotBlank
    private String academicYear;

    @Positive
    private Integer capacity;

    @NotNull
    private ClassStatus status;
}