import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();
        setError("");
        setSuccess("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true);

        try {

            await api.post("/auth/register", {
                username,
                password,
                role: "ADMIN"
            });

            setSuccess("Admin account created. Redirecting to login...");

            setTimeout(() => navigate("/"), 1500);

        }

        catch (err) {

            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Unable to register. Please try again.");
            }

            console.log(err);

        }

        finally {
            setLoading(false);
        }

    };

    return (

        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", background: "#f1f4f9" }}
        >

            <div className="card shadow-sm" style={{ width: "380px" }}>

                <div className="card-body p-4">

                    <h3 className="text-center text-primary mb-1">
                        Create Admin Account
                    </h3>

                    <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
                        Teacher and Student accounts are created automatically
                        when they are added from the admin panel. Use this
                        form only to create the first admin login.
                    </p>

                    {error &&
                        <div className="alert alert-danger py-2">
                            {error}
                        </div>
                    }

                    {success &&
                        <div className="alert alert-success py-2">
                            {success}
                        </div>
                    }

                    <form onSubmit={handleRegister}>

                        <div className="mb-3">

                            <label className="form-label">Username</label>

                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">Password</label>

                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Admin Account"}
                        </button>

                    </form>

                    <p className="text-center mt-3 mb-0" style={{ fontSize: "14px" }}>
                        <Link to="/">Back to Login</Link>
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;
