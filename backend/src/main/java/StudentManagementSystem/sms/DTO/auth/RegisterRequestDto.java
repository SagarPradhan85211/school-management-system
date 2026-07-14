package StudentManagementSystem.sms.DTO.auth;
import StudentManagementSystem.sms.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDto {

    @NotBlank(message = "Username Required")
    private String username;

    @NotBlank(message = "Password Required")
    private String password;

    @NotNull
    private Role role;

}
