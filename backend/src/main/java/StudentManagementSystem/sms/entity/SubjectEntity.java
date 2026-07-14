package StudentManagementSystem.sms.entity;

import StudentManagementSystem.sms.enums.SubjectStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "subjects")
@Getter
@Setter
public class SubjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String subjectName;

    @Column(nullable = false)
    private String subjectCode;

    @Column(nullable = false)
    private Integer credits;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubjectStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private SchoolClassEntity schoolClass;
}