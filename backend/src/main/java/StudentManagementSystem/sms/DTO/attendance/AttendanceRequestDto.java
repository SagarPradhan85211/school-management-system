package StudentManagementSystem.sms.DTO.attendance;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceRequestDto {

    @NotNull
    private Long subjectId;

    @NotNull
    private LocalDate attendanceDate;

    @NotNull
    private List<StudentAttendanceDto> students;

}