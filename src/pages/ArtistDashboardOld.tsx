import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  Plus, 
  Check, 
  X, 
  User, 
  Phone, 
  Mail,
  ArrowLeft,
  TrendingUp,
  Users,
  Award,
  Eye,
  Edit3,
  Trash2
} from "lucide-react";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  price: number;
  isAvailable: boolean;
}

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

interface Review {
  id: string;
  clientName: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  clientAvatar?: string;
}

const ArtistDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("schedule");
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  
  // Form states
  const [newSlot, setNewSlot] = useState({
    date: "",
    time: "",
    duration: "",
    service: "",
    price: ""
  });

  // Mock data - In real app, this would come from API
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: "1",
      date: "2025-11-02",
      time: "10:00",
      duration: 2,
      service: "Bridal Makeup",
      price: 200,
      isAvailable: true
    },
    {
      id: "2",
      date: "2025-11-02",
      time: "15:00",
      duration: 1.5,
      service: "Evening Glam",
      price: 150,
      isAvailable: true
    }
  ]);

  const [pendingBookings, setPendingBookings] = useState<Booking[]>([
    {
      id: "1",
      clientName: "Lisa Wilson",
      clientEmail: "lisa@email.com",
      clientPhone: "+1 (555) 123-4567",
      service: "Photoshoot Makeup",
      date: "2025-11-26",
      time: "9:00 AM",
      duration: 2,
      price: 180,
      status: "pending",
      notes: "Need natural look for headshots",
      createdAt: "2025-11-01"
    },
    {
      id: "2",
      clientName: "Maria Garcia",
      clientEmail: "maria@email.com",
      clientPhone: "+1 (555) 987-6543",
      service: "Wedding Makeup",
      date: "2025-11-28",
      time: "8:00 AM",
      duration: 3,
      price: 250,
      status: "confirmed",
      createdAt: "2025-10-28"
    }
  ]);

  const [todaysSchedule] = useState<Booking[]>([
    {
      id: "today1",
      clientName: "Sarah Johnson",
      clientEmail: "sarah@email.com",
      clientPhone: "+1 (555) 111-2222",
      service: "Bridal Makeup",
      date: "2025-11-01",
      time: "10:00 AM",
      duration: 2,
      price: 200,
      status: "confirmed",
      createdAt: "2025-10-25"
    },
    {
      id: "today2",
      clientName: "Emma Davis",
      clientEmail: "emma@email.com",
      clientPhone: "+1 (555) 333-4444",
      service: "Evening Glam",
      date: "2025-11-01",
      time: "3:00 PM",
      duration: 1.5,
      price: 150,
      status: "confirmed",
      createdAt: "2025-10-30"
    }
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      clientName: "Rachel Smith",
      service: "Bridal Makeup",
      rating: 5,
      comment: "Absolutely stunning work! Bella made me feel like a goddess on my wedding day.",
      date: "2025-10-20",
      clientAvatar: "/api/placeholder/40/40"
    },
    {
      id: "2",
      clientName: "Jennifer Brown",
      service: "Event Makeup",
      rating: 5,
      comment: "Professional, talented, and such a joy to work with. Highly recommend!",
      date: "2025-10-18",
      clientAvatar: "/api/placeholder/40/40"
    },
    {
      id: "3",
      clientName: "Amanda Wilson",
      service: "Photoshoot Makeup",
      rating: 4,
      comment: "Great attention to detail. The makeup looked perfect under studio lights.",
      date: "2025-10-15",
      clientAvatar: "/api/placeholder/40/40"
    },
    {
      id: "4",
      clientName: "Sophie Taylor",
      service: "Evening Glam",
      rating: 5,
      comment: "Exceeded my expectations! The look lasted all night and I felt amazing.",
      date: "2025-10-10",
      clientAvatar: "/api/placeholder/40/40"
    }
  ]);

  const handleAddSlot = () => {
    if (newSlot.date && newSlot.time && newSlot.duration && newSlot.service && newSlot.price) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        date: newSlot.date,
        time: newSlot.time,
        duration: parseInt(newSlot.duration),
        service: newSlot.service,
        price: parseInt(newSlot.price),
        isAvailable: true
      };
      setTimeSlots([...timeSlots, slot]);
      setNewSlot({ date: "", time: "", duration: "", service: "", price: "" });
      setIsAddSlotOpen(false);
    }
  };

  const handleApproveBooking = (bookingId: string) => {
    setPendingBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'confirmed' as const }
          : booking
      )
    );
  };

  const handleDeclineBooking = (bookingId: string) => {
    setPendingBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  const handleDeleteSlot = (slotId: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== slotId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Artist Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <Link to="/profile/artist">
              <Button variant="outline" className="btn-luxury">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Today's Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{todaysSchedule.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-accent" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold text-foreground">
                      {pendingBookings.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold text-foreground">4.9</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-foreground">$2,340</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full glass">
              <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
              <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
              <TabsTrigger value="slots">Manage Slots</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Today's Schedule Tab */}
            <TabsContent value="schedule">
              <Card className="glass border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>November 1, 2025</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysSchedule.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{booking.clientName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-foreground">{booking.clientName}</h4>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {booking.time} • {booking.duration} hours
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <DollarSign className="w-3 h-3 mr-1" />
                                ${booking.price}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsBookingDetailsOpen(true);
                            }}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Booking Requests Tab */}
            <TabsContent value="bookings">
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Booking Requests</CardTitle>
                  <CardDescription>Manage incoming appointment requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{booking.clientName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-foreground">{booking.clientName}</h4>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
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
                                ${booking.price}
                              </div>
                            </div>
                            {booking.notes && (
                              <p className="text-sm text-muted-foreground mt-1">Note: {booking.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeclineBooking(booking.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Decline
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleApproveBooking(booking.id)}
                                className="btn-luxury"
                              >
                                Approve
                              </Button>
                            </>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsBookingDetailsOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Manage Slots Tab */}
            <TabsContent value="slots">
              <Card className="glass border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Available Time Slots</CardTitle>
                    <CardDescription>Manage your availability</CardDescription>
                  </div>
                  <Dialog open={isAddSlotOpen} onOpenChange={setIsAddSlotOpen}>
                    <DialogTrigger asChild>
                      <Button className="btn-luxury">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Slot
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass">
                      <DialogHeader>
                        <DialogTitle>Add New Time Slot</DialogTitle>
                        <DialogDescription>Create a new available time slot for bookings</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={newSlot.date}
                              onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                              className="glass"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input
                              id="time"
                              type="time"
                              value={newSlot.time}
                              onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                              className="glass"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Service</Label>
                          <Select value={newSlot.service} onValueChange={(value) => setNewSlot({...newSlot, service: value})}>
                            <SelectTrigger className="glass">
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bridal Makeup">Bridal Makeup</SelectItem>
                              <SelectItem value="Evening Glam">Evening Glam</SelectItem>
                              <SelectItem value="Photoshoot Makeup">Photoshoot Makeup</SelectItem>
                              <SelectItem value="Special Event">Special Event</SelectItem>
                              <SelectItem value="Natural Look">Natural Look</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duration (hours)</Label>
                            <Input
                              id="duration"
                              type="number"
                              step="0.5"
                              min="0.5"
                              max="8"
                              value={newSlot.duration}
                              onChange={(e) => setNewSlot({...newSlot, duration: e.target.value})}
                              className="glass"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                              id="price"
                              type="number"
                              min="0"
                              value={newSlot.price}
                              onChange={(e) => setNewSlot({...newSlot, price: e.target.value})}
                              className="glass"
                            />
                          </div>
                        </div>
                        <Button onClick={handleAddSlot} className="w-full btn-luxury">
                          Add Time Slot
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div>
                          <h4 className="font-semibold text-foreground">{slot.service}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {slot.date}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {slot.time} • {slot.duration}h
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <DollarSign className="w-3 h-3 mr-1" />
                              ${slot.price}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={slot.isAvailable ? "default" : "secondary"}>
                            {slot.isAvailable ? "Available" : "Booked"}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                  <CardDescription>Latest feedback from your clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={review.clientAvatar} alt={review.clientName} />
                            <AvatarFallback>{review.clientName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-foreground">{review.clientName}</h4>
                                <p className="text-sm text-muted-foreground">{review.service}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                            <p className="text-foreground italic">"{review.comment}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-center">
                      <Button variant="outline" className="btn-luxury">
                        View All Reviews
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Booking Details Modal */}
          <Dialog open={isBookingDetailsOpen} onOpenChange={setIsBookingDetailsOpen}>
            <DialogContent className="glass max-w-md">
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
              </DialogHeader>
              {selectedBooking && (
                <div className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarFallback className="text-lg">{selectedBooking.clientName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{selectedBooking.clientName}</h3>
                    <p className="text-muted-foreground">{selectedBooking.service}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedBooking.clientEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedBooking.clientPhone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedBooking.date} at {selectedBooking.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedBooking.duration} hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">${selectedBooking.price}</span>
                    </div>
                  </div>
                  
                  {selectedBooking.notes && (
                    <div className="bg-primary/5 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Special Notes:</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center">
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status}
                    </Badge>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Footer />
    </>
  );
};

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

export default ArtistDashboard;