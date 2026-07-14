import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(() => {

        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        const id = localStorage.getItem("userId");

        if (token && username && role) {
            return { token, username, role, id };
        }

        return null;

    });

    const login = (data) => {

        // data => { id, username, role, token }

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);

        setAuth({
            token: data.token,
            username: data.username,
            role: data.role,
            id: data.id
        });

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        setAuth(null);

        navigate("/");

    };

    return (

        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;
