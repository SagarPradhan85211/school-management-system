package StudentManagementSystem.sms.DTO.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {

    @NotBlank(message = "Username Required")
    private String username;

    @NotBlank(message = "Password Required")
    private String password;

}
