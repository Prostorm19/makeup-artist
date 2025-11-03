import { useState, useEffect } from "react";
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
import { dataService, type Artist } from "@/services/dataService";
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  Plus,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Eye,
  Heart,
  MapPin,
  Search,
  Filter
} from "lucide-react";

interface TimeSlot {
  id: string;
  artistId: string;
  artistName: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  price: number;
}

interface Booking {
  id: string;
  artistName: string;
  artistPhone: string;
  artistEmail: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  notes?: string;
  createdAt: string;
}

interface Review {
  id: string;
  artistName: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  canEdit: boolean;
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("bookings");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);

  // Form states
  const [bookingForm, setBookingForm] = useState({
    notes: "",
    location: ""
  });

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ""
  });

  const [availableArtists, setAvailableArtists] = useState<Artist[]>([]);

  // Load artists when component mounts
  useEffect(() => {
    const artists = dataService.getAllArtists();
    setAvailableArtists(artists);
  }, []);

  const [availableSlots] = useState<TimeSlot[]>([
    {
      id: "1",
      artistId: "1",
      artistName: "Bella Martinez",
      date: "2025-11-05",
      time: "10:00",
      duration: 2,
      service: "Bridal Makeup",
      price: 200
    },
    {
      id: "2",
      artistId: "1",
      artistName: "Bella Martinez",
      date: "2025-11-05",
      time: "14:00",
      duration: 1.5,
      service: "Evening Glam",
      price: 150
    }
  ]);

  const [myBookings, setMyBookings] = useState<Booking[]>([
    {
      id: "1",
      artistName: "Bella Martinez",
      artistPhone: "+1 (555) 123-4567",
      artistEmail: "bella@email.com",
      service: "Bridal Makeup Trial",
      date: "2025-11-25",
      time: "10:00 AM",
      duration: 2,
      price: 150,
      status: "confirmed",
      location: "Bella Artistry Studio",
      createdAt: "2025-11-01"
    },
    {
      id: "2",
      artistName: "Sophie Chen",
      artistPhone: "+1 (555) 987-6543",
      artistEmail: "sophie@email.com",
      service: "Evening Glam",
      date: "2025-12-02",
      time: "4:00 PM",
      duration: 1.5,
      price: 120,
      status: "pending",
      location: "Client's Location",
      createdAt: "2025-11-01"
    },
    {
      id: "3",
      artistName: "Bella Martinez",
      artistPhone: "+1 (555) 123-4567",
      artistEmail: "bella@email.com",
      service: "Natural Day Look",
      date: "2025-10-15",
      time: "2:00 PM",
      duration: 1,
      price: 80,
      status: "completed",
      location: "Bella Artistry Studio",
      createdAt: "2025-10-10"
    }
  ]);

  const [favoriteArtists, setFavoriteArtists] = useState<Artist[]>([]);

  const [myReviews, setMyReviews] = useState<Review[]>([
    {
      id: "1",
      artistName: "Bella Martinez",
      service: "Natural Day Look",
      rating: 5,
      comment: "Absolutely loved my look! Bella is amazing at enhancing natural beauty.",
      date: "2025-10-16",
      canEdit: true
    }
  ]);

  const handleBookAppointment = () => {
    if (selectedTimeSlot) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        artistName: selectedTimeSlot.artistName,
        artistPhone: "+1 (555) 123-4567",
        artistEmail: "artist@email.com",
        service: selectedTimeSlot.service,
        date: selectedTimeSlot.date,
        time: selectedTimeSlot.time,
        duration: selectedTimeSlot.duration,
        price: selectedTimeSlot.price,
        status: "pending",
        location: bookingForm.location || "To be confirmed",
        notes: bookingForm.notes,
        createdAt: new Date().toISOString()
      };

      setMyBookings(prev => [newBooking, ...prev]);
      setIsBookingModalOpen(false);
      setSelectedTimeSlot(null);
      setBookingForm({ notes: "", location: "" });
    }
  };

  const handleSubmitReview = () => {
    if (selectedBookingForReview) {
      const newReview: Review = {
        id: Date.now().toString(),
        artistName: selectedBookingForReview.artistName,
        service: selectedBookingForReview.service,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toLocaleDateString(),
        canEdit: true
      };

      setMyReviews(prev => [newReview, ...prev]);
      setIsReviewModalOpen(false);
      setSelectedBookingForReview(null);
      setReviewForm({ rating: 5, comment: "" });
    }
  };

  const toggleFavorite = (artist: Artist) => {
    const isFavorite = favoriteArtists.some(fav => fav.id === artist.id);
    if (isFavorite) {
      setFavoriteArtists(prev => prev.filter(fav => fav.id !== artist.id));
    } else {
      setFavoriteArtists(prev => [...prev, artist]);
    }
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

  const renderRatingSelector = (currentRating: number, onChange: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onChange(i + 1)}
        className="focus:outline-none"
      >
        <Star
          className={`w-6 h-6 ${i < currentRating ? 'text-yellow-500 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
        />
      </button>
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
                <h1 className="text-3xl font-bold text-foreground">Client Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <Link to="/profile/client">
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
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{myBookings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-accent" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold text-foreground">
                      {myBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Favorite Artists</p>
                    <p className="text-2xl font-bold text-foreground">{favoriteArtists.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Reviews Given</p>
                    <p className="text-2xl font-bold text-foreground">{myReviews.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full glass">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="artists">Find Artists</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            </TabsList>

            {/* My Bookings Tab */}
            <TabsContent value="bookings">
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>View and manage your appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{booking.artistName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-foreground">{booking.service}</h4>
                            <p className="text-sm text-muted-foreground">with {booking.artistName}</p>
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
                                <MapPin className="w-3 h-3 mr-1" />
                                {booking.location}
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
                          {booking.status === 'completed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedBookingForReview(booking);
                                setIsReviewModalOpen(true);
                              }}
                            >
                              <Star className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Find Artists Tab */}
            <TabsContent value="artists">
              <Card className="glass border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Available Artists</CardTitle>
                    <CardDescription>Find and book appointments with top makeup artists</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {availableArtists.map((artist) => (
                      <div key={artist.id} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={artist.image} alt={artist.name} />
                              <AvatarFallback className="text-lg">{artist.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{artist.name}</h3>
                              <div className="flex items-center mt-1">
                                {renderStars(artist.rating)}
                                <span className="text-sm text-muted-foreground ml-2">({artist.rating})</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {artist.specialties.map((specialty) => (
                                  <Badge key={specialty} variant="secondary" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {artist.location}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  ${artist.hourlyRate}/hour
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleFavorite(artist)}
                              className={favoriteArtists.some(fav => fav.id === artist.id) ? "text-red-600" : ""}
                            >
                              <Heart
                                className={`w-4 h-4 mr-1 ${favoriteArtists.some(fav => fav.id === artist.id) ? 'fill-current' : ''
                                  }`}
                              />
                              {favoriteArtists.some(fav => fav.id === artist.id) ? 'Saved' : 'Save'}
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="btn-luxury" size="sm">
                                  Book Now
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="glass">
                                <DialogHeader>
                                  <DialogTitle>Available Time Slots - {artist.name}</DialogTitle>
                                  <DialogDescription>Select a time slot to book your appointment</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {availableSlots
                                    .filter(slot => slot.artistId === artist.id)
                                    .map((slot) => (
                                      <div
                                        key={slot.id}
                                        className="p-3 rounded-lg border border-primary/20 hover:bg-primary/5 cursor-pointer"
                                        onClick={() => {
                                          setSelectedTimeSlot(slot);
                                          setIsBookingModalOpen(true);
                                        }}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <h4 className="font-semibold">{slot.service}</h4>
                                            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                                              <span>{slot.date}</span>
                                              <span>{slot.time}</span>
                                              <span>{slot.duration}h</span>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold">${slot.price}</p>
                                            <Button size="sm" className="btn-luxury mt-1">
                                              Select
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
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
                  <div className="space-y-4">
                    {favoriteArtists.length > 0 ? (
                      favoriteArtists.map((artist) => (
                        <div key={artist.id} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback>{artist.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-foreground">{artist.name}</h4>
                                <p className="text-sm text-muted-foreground">{artist.specialties.join(", ")}</p>
                                <div className="flex items-center mt-1">
                                  {renderStars(artist.rating)}
                                  <span className="text-sm text-muted-foreground ml-2">({artist.rating})</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleFavorite(artist)}
                                className="text-red-600"
                              >
                                <Heart className="w-4 h-4 mr-1 fill-current" />
                                Remove
                              </Button>
                              <Button className="btn-luxury" size="sm">
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No favorite artists yet</p>
                        <p className="text-sm text-muted-foreground">Save artists you love to book them easily</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Reviews Tab */}
            <TabsContent value="reviews">
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle>My Reviews</CardTitle>
                  <CardDescription>Reviews you've given to artists</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myReviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{review.artistName}</h4>
                            <p className="text-sm text-muted-foreground">{review.service}</p>
                            <div className="flex items-center mt-2">
                              {renderStars(review.rating)}
                              <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                            </div>
                            <p className="text-foreground mt-2 italic">"{review.comment}"</p>
                          </div>
                          {review.canEdit && (
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Booking Confirmation Modal */}
          <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle>Confirm Booking</DialogTitle>
                <DialogDescription>Complete your appointment booking</DialogDescription>
              </DialogHeader>
              {selectedTimeSlot && (
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold">{selectedTimeSlot.service}</h3>
                    <p className="text-sm text-muted-foreground">with {selectedTimeSlot.artistName}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span>{selectedTimeSlot.date}</span>
                      <span>{selectedTimeSlot.time}</span>
                      <span>{selectedTimeSlot.duration} hours</span>
                      <span className="font-semibold">${selectedTimeSlot.price}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Preferred Location</Label>
                      <Select value={bookingForm.location} onValueChange={(value) => setBookingForm({ ...bookingForm, location: value })}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Choose location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="studio">Artist's Studio</SelectItem>
                          <SelectItem value="client">My Location</SelectItem>
                          <SelectItem value="venue">Event Venue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        className="glass"
                        placeholder="Any special requests or notes for the artist..."
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsBookingModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 btn-luxury"
                      onClick={handleBookAppointment}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Review Modal */}
          <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle>Leave a Review</DialogTitle>
                <DialogDescription>Share your experience with other clients</DialogDescription>
              </DialogHeader>
              {selectedBookingForReview && (
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold">{selectedBookingForReview.service}</h3>
                    <p className="text-sm text-muted-foreground">with {selectedBookingForReview.artistName}</p>
                    <p className="text-sm text-muted-foreground">{selectedBookingForReview.date}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex items-center space-x-1">
                        {renderRatingSelector(reviewForm.rating, (rating) => setReviewForm({ ...reviewForm, rating }))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comment">Your Review</Label>
                      <Textarea
                        id="comment"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="glass"
                        placeholder="Tell others about your experience..."
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsReviewModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 btn-luxury"
                      onClick={handleSubmitReview}
                    >
                      Submit Review
                    </Button>
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

export default ClientDashboard;