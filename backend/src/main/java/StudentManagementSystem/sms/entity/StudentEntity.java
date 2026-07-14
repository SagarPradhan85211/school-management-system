package StudentManagementSystem.sms.entity;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.Gender;
import StudentManagementSystem.sms.enums.StudentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "students")
@Getter
@Setter
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String rollNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private LocalDate admissionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StudentStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private SchoolClassEntity schoolClass;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    
}