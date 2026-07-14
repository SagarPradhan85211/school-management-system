# School Management System — Backend

Spring Boot REST API for the School Management System.

---

## Tech Stack

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Lombok

---

## Features

### Authentication

- JWT Login
- Register
- Password Encryption
- Role Based Authorization

---

### Student Module

- Add Student
- Update Student
- Delete Student
- Search Student
- Student Profile

---

### Teacher Module

- Add Teacher
- Update Teacher
- Delete Teacher
- Assigned Class
- Teacher Profile

---

### Class Module

- Add Class
- Update Class
- Delete Class

---

### Subject Module

- Add Subject
- Update Subject
- Delete Subject

---

### Attendance Module

- Mark Attendance
- Update Attendance
- Delete Attendance
- Student Attendance
- Teacher Attendance

---

## Security

Spring Security + JWT

Roles

- ADMIN
- TEACHER
- STUDENT

---

## Run Project

```
mvn spring-boot:run
```

Runs on

```
http://localhost:8080
```

---

## Database

MySQL

Create

```sql
CREATE DATABASE school_management;
```

Configure

```
application.properties
```

---

## REST API

```
POST   /auth/register
POST   /auth/login

GET    /students
POST   /students
PUT    /students/{id}
DELETE /students/{id}

GET    /teachers
POST   /teachers

GET    /classes
POST   /classes

GET    /subjects
POST   /subjects

GET    /attendance
POST   /attendance
```

---

## Author

Sagar Pradhan