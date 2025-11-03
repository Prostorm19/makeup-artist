import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/ImageUpload";
import { useAuth } from "@/contexts/AuthContext";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Heart,
    Edit3,
    Save,
    X,
    ArrowLeft,
    Camera,
    Star,
    Clock,
    DollarSign
} from "lucide-react";

const ClientProfile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        location: "",
        bio: "",
        skinType: "",
        preferences: ""
    });

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone: "",
            location: "",
            bio: "",
            skinType: "",
            preferences: ""
        });
        setIsEditing(false);
    };

    const handleImageChange = (imageUrl: string) => {
        updateProfile({ profileImage: imageUrl });
    };

    const getUserInitials = (name?: string, email?: string) => {
        if (name) {
            return name.split(' ').map(n => n[0]).join('').toUpperCase();
        }
        return email ? email[0].toUpperCase() : 'C';
    };

    // Mock data for bookings and favorites
    const recentBookings = [
        {
            id: 1,
            artist: "Sophia Martinez",
            service: "Bridal Makeup",
            date: "2024-12-15",
            time: "10:00 AM",
            status: "confirmed",
            price: "$250",
            image: "/api/placeholder/60/60"
        },
        {
            id: 2,
            artist: "Emma Wilson",
            service: "Evening Glam",
            date: "2024-11-20",
            time: "6:00 PM",
            status: "completed",
            price: "$120",
            image: "/api/placeholder/60/60"
        }
    ];

    const favoriteArtists = [
        {
            id: 1,
            name: "Sophia Martinez",
            specialty: "Bridal & Event Makeup",
            rating: 4.9,
            image: "/api/placeholder/60/60"
        },
        {
            id: 2,
            name: "Emma Wilson",
            specialty: "Fashion & Editorial",
            rating: 4.8,
            image: "/api/placeholder/60/60"
        }
    ];

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-b from-background to-background/50 pt-20">
                <div className="container mx-auto px-6 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <Link to="/dashboard/client">
                                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
                                <p className="text-muted-foreground">Manage your account and preferences</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                            <User className="w-3 h-3 mr-1" />
                            Client
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <Card className="glass border-primary/20">
                                <CardHeader className="text-center">
                                    <div className="mb-4">
                                        <ImageUpload
                                            currentImage={user?.profileImage}
                                            onImageChange={handleImageChange}
                                            userInitials={getUserInitials(user?.name, user?.email)}
                                            size="lg"
                                        />
                                    </div>
                                    <CardTitle className="text-foreground">{user?.name}</CardTitle>
                                    <CardDescription className="flex items-center justify-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {user?.email}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Phone className="w-4 h-4 mr-2" />
                                        <span>{formData.phone || "Add phone number"}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{formData.location || "Add location"}</span>
                                    </div>
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-primary">{recentBookings.length}</p>
                                            <p className="text-sm text-muted-foreground">Bookings</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-accent">{favoriteArtists.length}</p>
                                            <p className="text-sm text-muted-foreground">Favorites</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <Tabs defaultValue="info" className="space-y-6">
                                <TabsList className="grid grid-cols-3 w-full glass">
                                    <TabsTrigger value="info">Personal Info</TabsTrigger>
                                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                                </TabsList>

                                {/* Personal Information Tab */}
                                <TabsContent value="info">
                                    <Card className="glass border-primary/20">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <div>
                                                <CardTitle>Personal Information</CardTitle>
                                                <CardDescription>Update your personal details and preferences</CardDescription>
                                            </div>
                                            {!isEditing ? (
                                                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                                                    <Edit3 className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            ) : (
                                                <div className="flex space-x-2">
                                                    <Button onClick={handleSave} size="sm" className="btn-luxury">
                                                        <Save className="w-4 h-4 mr-2" />
                                                        Save
                                                    </Button>
                                                    <Button onClick={handleCancel} variant="outline" size="sm">
                                                        <X className="w-4 h-4 mr-2" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="glass"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="glass"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="glass"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="location">Location</Label>
                                                    <Input
                                                        id="location"
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="glass"
                                                        placeholder="City, State"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="skinType">Skin Type</Label>
                                                    <Input
                                                        id="skinType"
                                                        value={formData.skinType}
                                                        onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="glass"
                                                        placeholder="e.g., Oily, Dry, Combination"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="bio">About Me</Label>
                                                <Textarea
                                                    id="bio"
                                                    value={formData.bio}
                                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="glass min-h-[100px]"
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="preferences">Makeup Preferences</Label>
                                                <Textarea
                                                    id="preferences"
                                                    value={formData.preferences}
                                                    onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="glass min-h-[80px]"
                                                    placeholder="Your preferred makeup styles, colors, occasions..."
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Bookings Tab */}
                                <TabsContent value="bookings">
                                    <Card className="glass border-primary/20">
                                        <CardHeader>
                                            <CardTitle>Recent Bookings</CardTitle>
                                            <CardDescription>View and manage your makeup appointments</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {recentBookings.map((booking) => (
                                                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                                                        <div className="flex items-center space-x-4">
                                                            <Avatar className="w-12 h-12">
                                                                <AvatarImage src={booking.image} alt={booking.artist} />
                                                                <AvatarFallback>{booking.artist[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h4 className="font-semibold text-foreground">{booking.service}</h4>
                                                                <p className="text-sm text-muted-foreground">with {booking.artist}</p>
                                                                <div className="flex items-center space-x-4 mt-1">
                                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                                        <Calendar className="w-3 h-3 mr-1" />
                                                                        {booking.date}
                                                                    </div>
                                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                                        <Clock className="w-3 h-3 mr-1" />
                                                                        {booking.time}
                                                                    </div>
                                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                                        <DollarSign className="w-3 h-3 mr-1" />
                                                                        {booking.price}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                                                            className={booking.status === "confirmed" ? "bg-green-100 text-green-800" : ""}
                                                        >
                                                            {booking.status}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Favorites Tab */}
                                <TabsContent value="favorites">
                                    <Card className="glass border-primary/20">
                                        <CardHeader>
                                            <CardTitle>Favorite Artists</CardTitle>
                                            <CardDescription>Your saved makeup artists</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {favoriteArtists.map((artist) => (
                                                    <div key={artist.id} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                                                        <div className="flex items-center space-x-4">
                                                            <Avatar className="w-16 h-16">
                                                                <AvatarImage src={artist.image} alt={artist.name} />
                                                                <AvatarFallback>{artist.name[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-foreground">{artist.name}</h4>
                                                                <p className="text-sm text-muted-foreground">{artist.specialty}</p>
                                                                <div className="flex items-center mt-1">
                                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                                    <span className="text-sm font-medium ml-1">{artist.rating}</span>
                                                                </div>
                                                            </div>
                                                            <Button variant="outline" size="sm">
                                                                <Heart className="w-4 h-4 mr-2 fill-current text-red-500" />
                                                                Saved
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ClientProfile;