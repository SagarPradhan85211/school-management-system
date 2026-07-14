import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { auth, logout } = useAuth();

    return (

        <nav className="navbar navbar-dark bg-primary px-3 d-flex justify-content-between">

            <h4 className="text-white mb-0">
                School Management System
            </h4>

            <div className="d-flex align-items-center">

                {auth &&
                    <span className="text-white me-3">
                        {auth.username}
                        <span className="badge bg-light text-primary ms-2">
                            {auth.role}
                        </span>
                    </span>
                }

                <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;
