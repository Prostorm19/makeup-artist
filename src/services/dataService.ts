// Data service for managing artists and bookings
export interface TimeSlot {
    id: string;
    artistId: string;
    date: string;
    time: string;
    duration: number;
    service: string;
    price: number;
    isAvailable: boolean;
}

export interface Artist {
    id: string;
    name: string;
    email: string;
    specialties: string[];
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    location: string;
    bio: string;
    image: string;
    timeSlots: TimeSlot[];
}

export interface Booking {
    id: string;
    artistId: string;
    clientId: string;
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

class DataService {
    private static instance: DataService;
    private storageKey = 'makeup-artist-data';

    static getInstance(): DataService {
        if (!DataService.instance) {
            DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    // Get all data from localStorage
    private getData() {
        const data = localStorage.getItem(this.storageKey);
        if (!data) {
            return {
                artists: [],
                bookings: [],
                timeSlots: []
            };
        }
        return JSON.parse(data);
    }

    // Save data to localStorage
    private saveData(data: any) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Initialize or get artist profile
    initializeArtist(artistId: string, artistData: Partial<Artist>): Artist {
        const data = this.getData();
        let artist = data.artists.find((a: Artist) => a.id === artistId);

        if (!artist) {
            // Create new artist profile
            artist = {
                id: artistId,
                name: artistData.name || 'Unknown Artist',
                email: artistData.email || '',
                specialties: ['Bridal Makeup', 'Evening Glam'],
                rating: 4.9,
                reviewCount: 0,
                hourlyRate: 100,
                location: 'New York, NY',
                bio: 'Professional makeup artist specializing in bridal and special occasion makeup.',
                image: '/api/placeholder/300/300',
                timeSlots: [
                    {
                        id: `${artistId}-slot-1`,
                        artistId: artistId,
                        date: "2025-11-02",
                        time: "10:00",
                        duration: 2,
                        service: "Bridal Makeup",
                        price: 200,
                        isAvailable: true
                    },
                    {
                        id: `${artistId}-slot-2`,
                        artistId: artistId,
                        date: "2025-11-02",
                        time: "15:00",
                        duration: 1.5,
                        service: "Evening Glam",
                        price: 150,
                        isAvailable: true
                    }
                ]
            };

            data.artists.push(artist);
            this.saveData(data);
        }

        return artist;
    }

    // Get artist by ID
    getArtist(artistId: string): Artist | null {
        const data = this.getData();
        return data.artists.find((a: Artist) => a.id === artistId) || null;
    }

    // Get all artists
    getAllArtists(): Artist[] {
        const data = this.getData();
        return data.artists || [];
    }

    // Add time slot for artist
    addTimeSlot(artistId: string, timeSlot: Omit<TimeSlot, 'id' | 'artistId'>): TimeSlot {
        const data = this.getData();
        const artistIndex = data.artists.findIndex((a: Artist) => a.id === artistId);

        if (artistIndex === -1) {
            throw new Error('Artist not found');
        }

        const newSlot: TimeSlot = {
            ...timeSlot,
            id: `${artistId}-slot-${Date.now()}`,
            artistId: artistId
        };

        data.artists[artistIndex].timeSlots.push(newSlot);
        this.saveData(data);

        return newSlot;
    }

    // Remove time slot
    removeTimeSlot(artistId: string, slotId: string): void {
        const data = this.getData();
        const artistIndex = data.artists.findIndex((a: Artist) => a.id === artistId);

        if (artistIndex !== -1) {
            data.artists[artistIndex].timeSlots = data.artists[artistIndex].timeSlots.filter(
                (slot: TimeSlot) => slot.id !== slotId
            );
            this.saveData(data);
        }
    }

    // Get time slots for artist
    getArtistTimeSlots(artistId: string): TimeSlot[] {
        const artist = this.getArtist(artistId);
        return artist?.timeSlots || [];
    }

    // Update artist data
    updateArtist(artistId: string, updates: Partial<Artist>): void {
        const data = this.getData();
        const artistIndex = data.artists.findIndex((a: Artist) => a.id === artistId);

        if (artistIndex !== -1) {
            data.artists[artistIndex] = { ...data.artists[artistIndex], ...updates };
            this.saveData(data);
        }
    }

    // Add booking
    addBooking(booking: Omit<Booking, 'id'>): Booking {
        const data = this.getData();
        const newBooking: Booking = {
            ...booking,
            id: `booking-${Date.now()}`
        };

        if (!data.bookings) {
            data.bookings = [];
        }

        data.bookings.push(newBooking);
        this.saveData(data);

        return newBooking;
    }

    // Get bookings for artist
    getArtistBookings(artistId: string): Booking[] {
        const data = this.getData();
        return (data.bookings || []).filter((b: Booking) => b.artistId === artistId);
    }

    // Get bookings for client
    getClientBookings(clientId: string): Booking[] {
        const data = this.getData();
        return (data.bookings || []).filter((b: Booking) => b.clientId === clientId);
    }

    // Update booking status
    updateBookingStatus(bookingId: string, status: Booking['status']): void {
        const data = this.getData();
        const bookingIndex = data.bookings?.findIndex((b: Booking) => b.id === bookingId) ?? -1;

        if (bookingIndex !== -1) {
            data.bookings[bookingIndex].status = status;
            this.saveData(data);
        }
    }
}

export const dataService = DataService.getInstance();