import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, MapPin, Star, User, ArrowLeft } from "lucide-react";

const ClientDashboard = () => {
    const { user } = useAuth();

    const upcomingBookings = [
        {
            id: 1,
            service: "Bridal Makeup Trial",
            artist: "Bella Martinez",
            date: "2025-10-25",
            time: "10:00 AM",
            location: "Bella Artistry Studio",
            status: "confirmed",
            price: "$150"
        },
        {
            id: 2,
            service: "Evening Glam Look",
            artist: "Bella Martinez",
            date: "2025-11-02",
            time: "4:00 PM",
            location: "Client's Location",
            status: "pending",
            price: "$120"
        }
    ];

    const pastBookings = [
        {
            id: 3,
            service: "Natural Day Look",
            artist: "Bella Martinez",
            date: "2025-10-15",
            time: "2:00 PM",
            rating: 5,
            review: "Absolutely loved my look! Bella is amazing at enhancing natural beauty."
        }
    ];

    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-6">
                {/* Back to Home Navigation */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.location.href = '/'}
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome back, <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{user?.name}</span>
                    </h1>
                    <p className="text-muted-foreground">Manage your beauty appointments and preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Quick Stats */}
                    <Card className="glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold text-primary">2</p>
                                    <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold text-primary">4.9</p>
                                    <p className="text-sm text-muted-foreground">Average Rating</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold text-primary">5</p>
                                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upcoming Bookings */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Upcoming Bookings</CardTitle>
                            <CardDescription>Your scheduled appointments</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {upcomingBookings.map((booking) => (
                                <div key={booking.id} className="p-4 border border-border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{booking.service}</h3>
                                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                                            {booking.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">with {booking.artist}</p>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {booking.date}
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {booking.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {booking.location}
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="font-semibold text-primary">{booking.price}</span>
                                        <div className="space-x-2">
                                            <Button size="sm" variant="outline">Reschedule</Button>
                                            <Button size="sm">View Details</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button className="w-full btn-luxury">Book New Appointment</Button>
                        </CardContent>
                    </Card>

                    {/* Past Bookings & Reviews */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Recent History</CardTitle>
                            <CardDescription>Your past appointments and reviews</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {pastBookings.map((booking) => (
                                <div key={booking.id} className="p-4 border border-border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{booking.service}</h3>
                                        <div className="flex items-center">
                                            {[...Array(booking.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">with {booking.artist}</p>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {booking.date}
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {booking.time}
                                        </span>
                                    </div>
                                    {booking.review && (
                                        <p className="text-sm italic text-muted-foreground mt-2">
                                            "{booking.review}"
                                        </p>
                                    )}
                                    <Button size="sm" variant="outline" className="mt-2">
                                        Book Again
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;