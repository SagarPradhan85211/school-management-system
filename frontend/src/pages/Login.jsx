import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post("/auth/login", {
                username,
                password
            });

            login(response.data);

            navigate("/dashboard");

        }

        catch (err) {

            if (err.response && err.response.status === 401) {
                setError("Invalid username or password.");
            } else if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Unable to login. Please try again.");
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
                        School Management System
                    </h3>

                    <p className="text-center text-muted mb-4">
                        Sign in to continue
                    </p>

                    {error &&
                        <div className="alert alert-danger py-2">
                            {error}
                        </div>
                    }

                    <form onSubmit={handleLogin}>

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
                            {loading ? "Signing in..." : "Login"}
                        </button>

                    </form>

                    <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "14px" }}>
                        Need to create the first admin account?{" "}
                        <Link to="/register">Register</Link>
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;
