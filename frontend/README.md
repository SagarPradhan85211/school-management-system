# School Management System — Frontend

A React (Vite) frontend for the Spring Boot School Management System backend,
with JWT authentication and role-based access for **ADMIN**, **TEACHER**, and
**STUDENT** users.

## Tech Stack

- React 19 + Vite
- React Router v7
- Axios (with JWT auto-attach + auto-logout on 401)
- Bootstrap 5 (styling)

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` — this must match the backend's
`SecurityConfig` CORS allow-list (`http://localhost:5173`).

Make sure the Spring Boot backend is running at `http://localhost:8080`
(the base URL is set in `src/services/api.js`).

## First-time setup

There's no seeded admin user. Go to `/register` (linked from the login page)
to create the first **ADMIN** account. From there, the admin can add
Teachers and Students — creating either automatically creates their login
account too (this happens on the backend when you add them).

## Roles & Access

| Feature          | ADMIN | TEACHER | STUDENT |
|-------------------|:-----:|:-------:|:-------:|
| Dashboard         | stats | own profile | own profile |
| Students          | full CRUD | view only | — |
| Teachers          | full CRUD | — | — |
| Classes           | full CRUD | — | — |
| Subjects          | full CRUD | view only | — |
| Attendance        | view + delete | mark + edit + view | — |
| My Attendance     | — | — | own records |

This mirrors the `@PreAuthorize` rules already enforced on the backend
controllers — the frontend just hides actions the backend would reject
anyway.

## Project Structure

```
src/
  components/     Layout, Navbar, Sidebar, Modal, ProtectedRoute
  context/        AuthContext (token/role/username in localStorage)
  pages/
    Login.jsx, Register.jsx, Dashboard.jsx
    student/      Students.jsx, AddStudent.jsx
    teacher/      Teachers.jsx, AddTeacher.jsx
    schoolclass/  Classes.jsx (list + modal add/edit)
    subject/      Subjects.jsx (list + modal add/edit)
    attendance/   Attendance.jsx (mark + records), MyAttendance.jsx
  services/api.js Axios instance (baseURL, JWT header, 401 handling)
```

## Notes

- Editing a Teacher's record does not change their login username/password —
  the backend's `updateTeacher` endpoint doesn't touch credentials, so that
  form only asks for username/password when *adding* a new teacher.
- Attendance is marked per subject/date for every student in that subject's
  class. There's no backend endpoint to fetch students by class directly, so
  the frontend fetches all students and filters client-side by `classId`.
