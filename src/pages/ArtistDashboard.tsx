import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, DollarSign, Users, Star, Clock, Plus, ArrowLeft, Home } from "lucide-react";

const ArtistDashboard = () => {
    const { user } = useAuth();

    const todayBookings = [
        {
            id: 1,
            client: "Sarah Johnson",
            service: "Bridal Makeup",
            time: "10:00 AM",
            duration: "2 hours",
            status: "confirmed",
            price: "$200"
        },
        {
            id: 2,
            client: "Emma Davis",
            service: "Evening Glam",
            time: "3:00 PM",
            duration: "1.5 hours",
            status: "confirmed",
            price: "$150"
        }
    ];

    const upcomingBookings = [
        {
            id: 3,
            client: "Lisa Wilson",
            service: "Photoshoot Makeup",
            date: "2025-10-26",
            time: "9:00 AM",
            status: "pending approval",
            price: "$180"
        },
        {
            id: 4,
            client: "Maria Garcia",
            service: "Wedding Makeup",
            date: "2025-10-28",
            time: "8:00 AM",
            status: "confirmed",
            price: "$250"
        }
    ];

    const recentReviews = [
        {
            id: 1,
            client: "Rachel Smith",
            rating: 5,
            comment: "Absolutely stunning work! Bella made me feel like a goddess on my wedding day.",
            date: "2025-10-20",
            service: "Bridal Makeup"
        },
        {
            id: 2,
            client: "Jennifer Brown",
            rating: 5,
            comment: "Professional, talented, and such a joy to work with. Highly recommend!",
            date: "2025-10-18",
            service: "Event Makeup"
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
                    <p className="text-muted-foreground">Manage your bookings, clients, and portfolio</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Quick Stats */}
                    <Card className="glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold text-primary">2</p>
                                    <p className="text-sm text-muted-foreground">Today's Bookings</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <DollarSign className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold text-primary">$2,450</p>
                                    <p className="text-sm text-muted-foreground">This Month</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold text-primary">42</p>
                                    <p className="text-sm text-muted-foreground">Total Clients</p>
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
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Today's Schedule */}
                    <Card className="glass">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Today's Schedule</CardTitle>
                                    <CardDescription>October 22, 2025</CardDescription>
                                </div>
                                <Button size="sm" className="btn-luxury">
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Slot
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {todayBookings.map((booking) => (
                                <div key={booking.id} className="p-4 border border-border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{booking.client}</h3>
                                        <Badge variant="default">
                                            {booking.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{booking.service}</p>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {booking.time}
                                        </span>
                                        <span>{booking.duration}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="font-semibold text-primary">{booking.price}</span>
                                        <div className="space-x-2">
                                            <Button size="sm" variant="outline">Contact</Button>
                                            <Button size="sm">Details</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Upcoming Bookings */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Upcoming Bookings</CardTitle>
                            <CardDescription>Next appointments</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {upcomingBookings.map((booking) => (
                                <div key={booking.id} className="p-4 border border-border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{booking.client}</h3>
                                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                                            {booking.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{booking.service}</p>
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
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="font-semibold text-primary">{booking.price}</span>
                                        <div className="space-x-2">
                                            {booking.status === 'pending approval' && (
                                                <>
                                                    <Button size="sm" variant="outline">Decline</Button>
                                                    <Button size="sm">Approve</Button>
                                                </>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <Button size="sm" variant="outline">Details</Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Reviews */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Recent Reviews</CardTitle>
                            <CardDescription>Latest client feedback</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentReviews.map((review) => (
                                <div key={review.id} className="p-4 border border-border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{review.client}</h3>
                                        <div className="flex items-center">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{review.service}</p>
                                    <p className="text-sm italic mb-2">"{review.comment}"</p>
                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                            ))}
                            <Button className="w-full" variant="outline">
                                View All Reviews
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Button className="btn-luxury p-6 h-auto flex-col">
                        <Calendar className="w-8 h-8 mb-2" />
                        <span>Manage Calendar</span>
                    </Button>

                    <Button className="btn-luxury p-6 h-auto flex-col">
                        <Users className="w-8 h-8 mb-2" />
                        <span>Client Management</span>
                    </Button>

                    <Button className="btn-luxury p-6 h-auto flex-col">
                        <Star className="w-8 h-8 mb-2" />
                        <span>Portfolio Updates</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ArtistDashboard;