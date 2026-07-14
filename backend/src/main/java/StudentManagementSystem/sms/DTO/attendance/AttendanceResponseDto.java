package StudentManagementSystem.sms.DTO.attendance;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.AttendanceStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceResponseDto {

    private Long id;

    private String studentName;

    private String subjectName;

    private LocalDate attendanceDate;

    private AttendanceStatus status;

}