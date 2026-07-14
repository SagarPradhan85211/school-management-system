import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const { auth } = useAuth();

    const role = auth ? auth.role : null;

    const linkClass = ({ isActive }) =>
        "d-block px-2 py-2 mb-1 rounded text-decoration-none " +
        (isActive ? "bg-primary text-white" : "text-white");

    return (

        <div
            className="bg-dark p-3"
            style={{ width: "230px", minHeight: "calc(100vh - 56px)" }}
        >

            <NavLink className={linkClass} to="/dashboard">
                Dashboard
            </NavLink>

            {(role === "ADMIN" || role === "TEACHER") &&
                <NavLink className={linkClass} to="/students">
                    Students
                </NavLink>
            }

            {role === "ADMIN" &&
                <NavLink className={linkClass} to="/teachers">
                    Teachers
                </NavLink>
            }

            {role === "ADMIN" &&
                <NavLink className={linkClass} to="/classes">
                    Classes
                </NavLink>
            }

            {(role === "ADMIN" || role === "TEACHER") &&
                <NavLink className={linkClass} to="/subjects">
                    Subjects
                </NavLink>
            }

            {(role === "ADMIN" || role === "TEACHER") &&
                <NavLink className={linkClass} to="/attendance">
                    Attendance
                </NavLink>
            }

            {role === "STUDENT" &&
                <NavLink className={linkClass} to="/my-attendance">
                    My Attendance
                </NavLink>
            }

        </div>

    );

}

export default Sidebar;
