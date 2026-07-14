package StudentManagementSystem.sms.DTO.auth;

import StudentManagementSystem.sms.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponseDto {

    private Long id;

    private String username;

    private Role role;
}