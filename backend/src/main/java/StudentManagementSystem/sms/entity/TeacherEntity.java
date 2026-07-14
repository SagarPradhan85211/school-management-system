package StudentManagementSystem.sms.entity;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.Gender;
import StudentManagementSystem.sms.enums.TeacherStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "teachers")
@Getter
@Setter
public class TeacherEntity {

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false)
    private Integer experience;

    @Column(nullable = false)
    private Double salary;

    @Column(nullable = false)
    private LocalDate joiningDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TeacherStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private SchoolClassEntity schoolClass;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    
}