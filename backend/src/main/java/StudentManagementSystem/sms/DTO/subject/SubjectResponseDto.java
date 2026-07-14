package StudentManagementSystem.sms.DTO.subject;

import StudentManagementSystem.sms.enums.SubjectStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectResponseDto {

    private Long id;

    private String subjectName;

    private String subjectCode;

    private Integer credits;

    private SubjectStatus status;

    private Long teacherId;

    private String teacherName;

    private Long classId;

    private Integer className;

    private String section;
}