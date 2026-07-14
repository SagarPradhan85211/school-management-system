

# 🎓 School Management System

A full-stack School Management System built using **Spring Boot** and **React** with **JWT Authentication**, **Role-Based Authorization**, and **MySQL**.

This project allows schools to manage Students, Teachers, Classes, Subjects, and Attendance through separate dashboards for Admin, Teacher, and Student.

---

## 🚀 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA (Hibernate)
- MySQL
- Lombok
- Maven

### Frontend
- React 19
- Vite
- React Router
- Axios
- Bootstrap 5

---

## ✨ Features

### Authentication
- Login
- JWT Authentication
- Role Based Authorization
- Password Encryption (BCrypt)

### Admin
- Dashboard
- Manage Students
- Manage Teachers
- Manage Classes
- Manage Subjects
- View Attendance
- Delete Attendance

### Teacher
- Dashboard
- View Assigned Class
- Mark Attendance
- Edit Attendance
- View Attendance Records

### Student
- Dashboard
- View Profile
- View My Attendance

---

## 📁 Project Structure

```
school-management-system/
│
├── backend/
│
├── frontend/
│
└── README.md
```

---

## ⚙️ Run Locally

### Backend

```
cd backend
mvn spring-boot:run
```

Runs on

```
http://localhost:8080
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Database

MySQL

Create database

```sql
CREATE DATABASE school_management;
```

Update

```
application.properties
```

with your database credentials.

---

## Future Improvements

- Fee Management
- Exam Module
- Report Cards
- Timetable
- Notifications
- Parent Portal

---

## 👨‍💻 Developed By

**Sagar Pradhan**

GitHub:
https://github.com/SagarPradhan85211