import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserType = "client" | "artist" | null;

interface User {
    id: string;
    email: string;
    name?: string;
    type: UserType;
    profileImage?: string;
}

interface AuthContextType {
    user: User | null;
    userType: UserType;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string, type: UserType) => Promise<boolean>;
    signup: (email: string, password: string, type: UserType, name?: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [userType, setUserType] = useState<UserType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check for existing session on app load
        const token = localStorage.getItem("makeup-artist-token");
        const savedUser = localStorage.getItem("makeup-artist-user");
        const savedUserType = localStorage.getItem("makeup-artist-user-type");

        if (token && savedUser && savedUserType) {
            setUser(JSON.parse(savedUser));
            setUserType(savedUserType as UserType);
            // Optionally verify token with backend
            verifyToken(token);
        }
    }, []);

    const verifyToken = async (token: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Token is invalid, clear storage
                logout();
                return;
            }

            const data = await response.json();
            const userData: User = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                type: data.user.userType,
                profileImage: data.user.profileImage
            };

            setUser(userData);
            setUserType(data.user.userType);
        } catch (error) {
            console.error("Token verification failed:", error);
            logout();
        }
    };

    const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    userType: type
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
                return false;
            }

            const userData: User = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                type: data.user.userType,
                profileImage: data.user.profileImage
            };

            setUser(userData);
            setUserType(type);

            // Save to localStorage
            localStorage.setItem("makeup-artist-token", data.token);
            localStorage.setItem("makeup-artist-user", JSON.stringify(userData));
            localStorage.setItem("makeup-artist-user-type", type);

            return true;
        } catch (error) {
            console.error("Login error:", error);
            setError("Network error. Please try again.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, type: UserType, name?: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name || (type === "artist" ? "New Artist" : "New Client"),
                    email,
                    password,
                    userType: type
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Signup failed');
                return false;
            }

            const userData: User = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                type: data.user.userType,
                profileImage: data.user.profileImage
            };

            setUser(userData);
            setUserType(type);

            // Save to localStorage
            localStorage.setItem("makeup-artist-token", data.token);
            localStorage.setItem("makeup-artist-user", JSON.stringify(userData));
            localStorage.setItem("makeup-artist-user-type", type);

            return true;
        } catch (error) {
            console.error("Signup error:", error);
            setError("Network error. Please try again.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setUserType(null);
        localStorage.removeItem("makeup-artist-token");
        localStorage.removeItem("makeup-artist-user");
        localStorage.removeItem("makeup-artist-user-type");
    };

    const updateProfile = async (updates: Partial<User>) => {
        if (!user) return;

        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("makeup-artist-token");
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Profile update failed');
                return;
            }

            const updatedUser = { ...user, ...data.user };
            setUser(updatedUser);
            localStorage.setItem("makeup-artist-user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Update profile error:", error);
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const value: AuthContextType = {
        user,
        userType,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        signup,
        logout,
        updateProfile,
        clearError
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};