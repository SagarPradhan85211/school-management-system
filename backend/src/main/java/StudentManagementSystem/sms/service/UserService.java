package StudentManagementSystem.sms.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import StudentManagementSystem.sms.DTO.auth.LoginRequestDto;
import StudentManagementSystem.sms.DTO.auth.LoginResponseDto;
import StudentManagementSystem.sms.DTO.auth.RegisterRequestDto;
import StudentManagementSystem.sms.DTO.auth.RegisterResponseDto;
import StudentManagementSystem.sms.entity.UserEntity;
import StudentManagementSystem.sms.enums.Role;
import StudentManagementSystem.sms.exception.DuplicateResourceException;
import StudentManagementSystem.sms.exception.ResourceNotFoundException;
import StudentManagementSystem.sms.exception.UnauthorizedException;
import StudentManagementSystem.sms.repository.UserRepository;
import StudentManagementSystem.sms.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repo;

    private final JwtService jwtService;

    private final CustomUserDetailsService customUserDetailsService;

    private RegisterResponseDto toResponseDto(UserEntity user) {
        RegisterResponseDto dto = new RegisterResponseDto();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());

        return dto;
    }

    private UserEntity toEntity(RegisterRequestDto register) {
        UserEntity userentity = new UserEntity();

        userentity.setUsername(register.getUsername());
        userentity.setPassword(passwordEncoder.encode(register.getPassword()));
        userentity.setRole(register.getRole());

        return userentity;

    }

    public RegisterResponseDto register(RegisterRequestDto user) {
        if (repo.existsByUsername(user.getUsername())) {
            log.warn("Username Already exists");
            throw new DuplicateResourceException("Username Already Exists");
        }

        if (user.getRole() == Role.ADMIN && repo.existsByRole(Role.ADMIN)) {
            log.warn("Admin role already exists");
            throw new DuplicateResourceException("An Admin already exists");
        }

        UserEntity entity = toEntity(user);

        UserEntity response = repo.save(entity);

        return toResponseDto(response);

    }

    private LoginResponseDto toLoginResponseDto(UserEntity user) {

        LoginResponseDto dto = new LoginResponseDto();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());

        String token = jwtService.generateToken(user);

        dto.setToken(token);

        return dto;
    }

    public LoginResponseDto login(LoginRequestDto userlogin) {

        UserEntity user = repo.findByUsername(userlogin.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not Registered"));

        if (!passwordEncoder.matches(userlogin.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid Password");
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());

        String token = jwtService.generateToken(userDetails);

        LoginResponseDto response = toLoginResponseDto(user);

        response.setToken(token);

        return response;
    }

    public UserEntity createUser(String username,
            String password,
            Role role) {

        if (repo.existsByUsername(username)) {
            throw new DuplicateResourceException("Username Already Exists");
        }

        UserEntity user = new UserEntity();

        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        return repo.save(user);
    }

    public void updatePassword(UserEntity user, String password) {

        user.setPassword(passwordEncoder.encode(password));

        repo.save(user);

    }

    public UserEntity saveUser(UserEntity user) {

        return repo.save(user);

    }

    public boolean existsByUsername(String username) {

        return repo.existsByUsername(username);

    }

    public void deleteUser(UserEntity user) {
        repo.delete(user);
    }

}
