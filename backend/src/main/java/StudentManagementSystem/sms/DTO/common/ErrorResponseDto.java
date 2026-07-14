package StudentManagementSystem.sms.DTO.common;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponseDto {

    private LocalDateTime timestamp;

    private int status;

    private String error;

    private String message;

}