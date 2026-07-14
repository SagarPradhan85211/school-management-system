package StudentManagementSystem.sms.DTO.subject;

import StudentManagementSystem.sms.enums.SubjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectRequestDto {

    @NotBlank(message = "Subject Name is required")
    private String subjectName;

    @NotBlank(message = "Subject Code is required")
    private String subjectCode;

    @NotNull(message = "Credits are required")
    @Positive(message = "Credits must be greater than 0")
    private Integer credits;

    @NotNull(message = "Status is required")
    private SubjectStatus status;

    @NotNull(message = "Teacher is required")
    private Long teacherId;

    @NotNull(message = "Class is required")
    private Long classId;

}