package StudentManagementSystem.sms.entity;

import java.time.LocalDate;

import StudentManagementSystem.sms.enums.AttendanceStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "attendance",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"student_id", "subject_id", "attendance_date"}
        )
    }
)
@Getter
@Setter
public class AttendanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private SubjectEntity subject;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;

}