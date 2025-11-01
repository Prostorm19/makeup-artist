import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User, Palette, Loader2 } from "lucide-react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [artistEmail, setArtistEmail] = useState("");
    const [artistPassword, setArtistPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { login, signup } = useAuth();

    const handleUserLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const success = await login(userEmail, userPassword, "client");
            if (success) {
                onClose();
                // Optional: Navigate to client dashboard
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleArtistLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const success = await login(artistEmail, artistPassword, "artist");
            if (success) {
                onClose();
                // Optional: Navigate to artist dashboard
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const success = await signup(userEmail, userPassword, "client");
            if (success) {
                onClose();
            }
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleArtistSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const success = await signup(artistEmail, artistPassword, "artist");
            if (success) {
                onClose();
            }
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] glass backdrop-blur-xl border-primary/20">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                        {isLogin ? "Welcome Back" : "Join Us"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                        {isLogin ? "Sign in to your account" : "Create your account"}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center mb-4">
                    <div className="flex rounded-lg bg-muted p-1">
                        <Button
                            variant={isLogin ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setIsLogin(true)}
                            className={isLogin ? "btn-luxury" : ""}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant={!isLogin ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setIsLogin(false)}
                            className={!isLogin ? "btn-luxury" : ""}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="user" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="user" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Client
                        </TabsTrigger>
                        <TabsTrigger value="artist" className="flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Makeup Artist
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="user" className="space-y-4">
                        <div className="flex items-center justify-center mb-4">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                                <User className="w-3 h-3 mr-1" />
                                Client Portal
                            </Badge>
                        </div>

                        <form onSubmit={isLogin ? handleUserLogin : handleUserSignup} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="user-email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="user-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="pl-10 glass border-primary/30 focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="user-password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="user-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        className="pl-10 glass border-primary/30 focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full btn-luxury" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLogin ? "Sign In as Client" : "Create Client Account"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="artist" className="space-y-4">
                        <div className="flex items-center justify-center mb-4">
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                                <Palette className="w-3 h-3 mr-1" />
                                Artist Portal
                            </Badge>
                        </div>

                        <form onSubmit={isLogin ? handleArtistLogin : handleArtistSignup} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="artist-email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="artist-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={artistEmail}
                                        onChange={(e) => setArtistEmail(e.target.value)}
                                        className="pl-10 glass border-primary/30 focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="artist-password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="artist-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={artistPassword}
                                        onChange={(e) => setArtistPassword(e.target.value)}
                                        className="pl-10 glass border-primary/30 focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-gradient-to-r from-accent to-primary text-white" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLogin ? "Sign In as Artist" : "Create Artist Account"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                <div className="text-center text-sm text-muted-foreground">
                    {isLogin ? (
                        <p>
                            Don't have an account?{" "}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-primary hover:underline font-medium"
                            >
                                Sign up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;