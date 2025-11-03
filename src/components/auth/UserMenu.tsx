import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/auth/LoginModal";
import { User, LogOut, Calendar, Palette, Heart, Home } from "lucide-react";

const UserMenu = () => {
    const { user, userType, isAuthenticated, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to homepage after logout
    };

    if (!isAuthenticated) {
        return (
            <>
                <Button
                    onClick={() => setShowLoginModal(true)}
                    className="btn-luxury"
                >
                    Sign In
                </Button>
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            </>
        );
    }

    const getUserInitials = (name?: string, email?: string) => {
        if (name) {
            return name.split(' ').map(n => n[0]).join('').toUpperCase();
        }
        return email ? email[0].toUpperCase() : 'U';
    };

    const getTypeColor = (type: string) => {
        return type === 'artist' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary';
    };

    const getTypeIcon = (type: string) => {
        return type === 'artist' ? <Palette className="w-3 h-3" /> : <User className="w-3 h-3" />;
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarImage src={user?.profileImage} alt={user?.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {getUserInitials(user?.name, user?.email)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 glass backdrop-blur-xl border-primary/20" align="end">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium leading-none">{user?.name}</p>
                                <Badge variant="secondary" className={`text-xs ${getTypeColor(userType || '')}`}>
                                    {getTypeIcon(userType || '')}
                                    <span className="ml-1 capitalize">{userType}</span>
                                </Badge>
                            </div>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-border/50" />

                    <DropdownMenuItem className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        <Link to={`/dashboard/${userType}`}>Dashboard</Link>
                    </DropdownMenuItem>

                    {userType === 'client' && (
                        <>
                            <DropdownMenuItem className="cursor-pointer">
                                <Calendar className="mr-2 h-4 w-4" />
                                <Link to="/dashboard/client?tab=bookings">My Bookings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Heart className="mr-2 h-4 w-4" />
                                <Link to="/dashboard/client?tab=favorites">Favorites</Link>
                            </DropdownMenuItem>
                        </>
                    )}

                    {userType === 'artist' && (
                        <>
                            <DropdownMenuItem className="cursor-pointer">
                                <Calendar className="mr-2 h-4 w-4" />
                                <Link to="/dashboard/artist">Manage Bookings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Palette className="mr-2 h-4 w-4" />
                                <Link to="/dashboard/artist">Portfolio Manager</Link>
                            </DropdownMenuItem>
                        </>
                    )}

                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <Link to={`/profile/${userType}`}>Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-border/50" />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
};

export default UserMenu;