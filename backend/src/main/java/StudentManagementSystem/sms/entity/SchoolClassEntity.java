package StudentManagementSystem.sms.entity;

import StudentManagementSystem.sms.enums.ClassStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "school_classes",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"className", "section", "academicYear"})
    }
)
@Getter
@Setter
public class SchoolClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer className;

    @Column(nullable = false)
    private String section;

    @Column(nullable = false)
    private String academicYear;

    @Column(nullable = false)
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClassStatus status;
}