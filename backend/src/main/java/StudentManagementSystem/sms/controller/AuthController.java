package StudentManagementSystem.sms.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import StudentManagementSystem.sms.DTO.auth.LoginRequestDto;
import StudentManagementSystem.sms.DTO.auth.LoginResponseDto;
import StudentManagementSystem.sms.DTO.auth.RegisterRequestDto;
import StudentManagementSystem.sms.DTO.auth.RegisterResponseDto;
import StudentManagementSystem.sms.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userservice;

    @PostMapping("/register")
    public RegisterResponseDto register(@Valid @RequestBody RegisterRequestDto request) {

        return userservice.register(request);

    }

    @PostMapping("/login")
    public LoginResponseDto login(@Valid @RequestBody LoginRequestDto request) {
        return userservice.login(request);
    }

}
