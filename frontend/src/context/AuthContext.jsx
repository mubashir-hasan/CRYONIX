import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authType, setAuthType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const rawUser = localStorage.getItem("user");
        const storedAuthType = localStorage.getItem("authType");

        let parsedUser = null;
        try {
            parsedUser =
                rawUser && rawUser !== "undefined"
                    ? JSON.parse(rawUser)
                    : null;
        } catch {
            parsedUser = null;
        }

        if (token && parsedUser && storedAuthType) {
            setUser(parsedUser);
            setAuthType(storedAuthType);
        } else {
            setUser(null);
            setAuthType(null);
        }

        setLoading(false);
    }, []);

    const login = ({ token, user, authType }) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authType", authType);
        setUser(user);
        setAuthType(authType);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("authType");
        setUser(null);
        setAuthType(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authType,
                isAuthenticated: !!user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
