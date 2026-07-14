package StudentManagementSystem.sms.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import StudentManagementSystem.sms.DTO.common.ErrorResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ErrorResponseDto> handleNotFound(
                        ResourceNotFoundException ex) {

                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(new ErrorResponseDto(
                                                LocalDateTime.now(),
                                                404,
                                                "NOT_FOUND",
                                                ex.getMessage()));
        }

        @ExceptionHandler(DuplicateResourceException.class)
        public ResponseEntity<ErrorResponseDto> handleDuplicate(
                        DuplicateResourceException ex) {

                return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ErrorResponseDto(
                                                LocalDateTime.now(),
                                                409,
                                                "CONFLICT",
                                                ex.getMessage()));
        }

        @ExceptionHandler(UnauthorizedException.class)
        public ResponseEntity<ErrorResponseDto> handleUnauthorized(
                        UnauthorizedException ex) {

                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(new ErrorResponseDto(
                                                LocalDateTime.now(),
                                                403,
                                                "FORBIDDEN",
                                                ex.getMessage()));
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponseDto> handleException(
                        Exception ex) {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(new ErrorResponseDto(
                                                LocalDateTime.now(),
                                                500,
                                                "INTERNAL_SERVER_ERROR",
                                                ex.getMessage()));
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, String>> handleValidation(
                        MethodArgumentNotValidException ex) {

                Map<String, String> errors = new HashMap<>();

                ex.getBindingResult().getFieldErrors().forEach(error -> {

                        errors.put(error.getField(), error.getDefaultMessage());

                });

                return ResponseEntity.badRequest().body(errors);

        }

}