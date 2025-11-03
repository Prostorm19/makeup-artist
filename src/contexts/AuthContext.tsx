import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dataService } from "@/services/dataService";

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

// Helper functions for validation
const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
};

const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
    return null;
};

// Local storage helpers
const getUsersFromStorage = () => {
    const users = localStorage.getItem('makeup-artist-users');
    return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users: any[]) => {
    localStorage.setItem('makeup-artist-users', JSON.stringify(users));
};

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
            // Validate input fields
            const emailError = validateEmail(email);
            if (emailError) {
                setError(emailError);
                return false;
            }

            if (!password) {
                setError("Password is required");
                return false;
            }

            // Get users from localStorage
            const users = getUsersFromStorage();

            // Find user with matching email and type
            const foundUser = users.find((u: any) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.type === type
            );

            if (!foundUser) {
                setError("Invalid email or password");
                return false;
            }

            // Check password (in a real app, this would be hashed)
            if (foundUser.password !== password) {
                setError("Invalid email or password");
                return false;
            }

            const userData: User = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                type: foundUser.type,
                profileImage: foundUser.profileImage
            };

            setUser(userData);
            setUserType(type);

            // Save to localStorage
            localStorage.setItem("makeup-artist-token", `token-${foundUser.id}`);
            localStorage.setItem("makeup-artist-user", JSON.stringify(userData));
            localStorage.setItem("makeup-artist-user-type", type);

            return true;
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, type: UserType, name?: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Validate input fields
            const emailError = validateEmail(email);
            if (emailError) {
                setError(emailError);
                return false;
            }

            const passwordError = validatePassword(password);
            if (passwordError) {
                setError(passwordError);
                return false;
            }

            // Get existing users from localStorage
            const users = getUsersFromStorage();

            // Check if email already exists (regardless of user type)
            const existingUser = users.find((u: any) =>
                u.email.toLowerCase() === email.toLowerCase()
            );

            if (existingUser) {
                if (existingUser.type === type) {
                    setError(`An account with this email already exists as a ${type}. Please sign in instead.`);
                } else {
                    setError(`This email is already registered as a ${existingUser.type}. Please use a different email or sign in with the correct account type.`);
                }
                return false;
            }

            // Create new user
            const newUser = {
                id: `user-${Date.now()}`,
                email: email.toLowerCase(),
                name: name || (type === "artist" ? "New Artist" : "New Client"),
                password: password, // In a real app, this would be hashed
                type: type,
                profileImage: undefined,
                createdAt: new Date().toISOString()
            };

            // Add to users array and save
            users.push(newUser);
            saveUsersToStorage(users);

            const userData: User = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                type: newUser.type,
                profileImage: newUser.profileImage
            };

            setUser(userData);
            setUserType(type);

            // Save to localStorage
            localStorage.setItem("makeup-artist-token", `token-${newUser.id}`);
            localStorage.setItem("makeup-artist-user", JSON.stringify(userData));
            localStorage.setItem("makeup-artist-user-type", type);

            // If user is an artist, initialize their profile in dataService
            if (type === 'artist') {
                dataService.initializeArtist(newUser.id, {
                    name: newUser.name,
                    email: newUser.email
                });
            }

            return true;
        } catch (error) {
            console.error("Signup error:", error);
            setError("An error occurred. Please try again.");
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
            // For now, update locally since we don't have a backend
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem("makeup-artist-user", JSON.stringify(updatedUser));

            // If user is an artist, also update the artist data in dataService
            if (userType === 'artist') {
                dataService.updateArtist(user.id, {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    image: updatedUser.profileImage
                });
            }

            // Uncomment this when backend is available
            /*
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
            */
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