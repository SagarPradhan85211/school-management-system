import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import Students from "./pages/student/Students";
import AddStudent from "./pages/student/AddStudent";

import Teachers from "./pages/teacher/Teachers";
import AddTeacher from "./pages/teacher/AddTeacher";

import Classes from "./pages/schoolclass/Classes";
import Subjects from "./pages/subject/Subjects";

import Attendance from "./pages/attendance/Attendance";
import MyAttendance from "./pages/attendance/MyAttendance";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Students: ADMIN + TEACHER can view, only ADMIN can add/edit */}
            <Route
                path="/students"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]}>
                        <Students />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/students/add"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AddStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/students/edit/:id"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AddStudent />
                    </ProtectedRoute>
                }
            />

            {/* Teachers: ADMIN only */}
            <Route
                path="/teachers"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <Teachers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teachers/add"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AddTeacher />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teachers/edit/:id"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AddTeacher />
                    </ProtectedRoute>
                }
            />

            {/* Classes: ADMIN only */}
            <Route
                path="/classes"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <Classes />
                    </ProtectedRoute>
                }
            />

            {/* Subjects: ADMIN + TEACHER can view, only ADMIN can add/edit/delete */}
            <Route
                path="/subjects"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]}>
                        <Subjects />
                    </ProtectedRoute>
                }
            />

            {/* Attendance: ADMIN + TEACHER */}
            <Route
                path="/attendance"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]}>
                        <Attendance />
                    </ProtectedRoute>
                }
            />

            {/* My Attendance: STUDENT only */}
            <Route
                path="/my-attendance"
                element={
                    <ProtectedRoute allowedRoles={["STUDENT"]}>
                        <MyAttendance />
                    </ProtectedRoute>
                }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />

        </Routes>

    );

}

export default App;
