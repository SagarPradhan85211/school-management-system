package StudentManagementSystem.sms.DTO.attendance;

import StudentManagementSystem.sms.enums.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentAttendanceDto {

    @NotNull
    private Long studentId;

    @NotNull
    private AttendanceStatus status;

}