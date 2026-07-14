package StudentManagementSystem.sms.DTO.schoolclass;


import StudentManagementSystem.sms.enums.ClassStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolClassResponseDto {

    private Long id;

    private Integer className;

    private String section;

    private String academicYear;

    private Integer capacity;

    private ClassStatus status;
}