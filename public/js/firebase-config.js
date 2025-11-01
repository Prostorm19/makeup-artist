// Firebase Configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Firebase Database Collections
const COLLECTIONS = {
  ARTISTS: 'artists',
  BOOKINGS: 'bookings',
  REVIEWS: 'reviews',
  SERVICES: 'services',
  USERS: 'users'
};

// Firebase Helper Functions
const FirebaseService = {
  // Artists
  async getArtists(filters = {}) {
    try {
      let query = db.collection(COLLECTIONS.ARTISTS);
      
      if (filters.specialty) {
        query = query.where('specialties', 'array-contains', filters.specialty);
      }
      
      if (filters.location) {
        query = query.where('location', '==', filters.location);
      }
      
      if (filters.rating) {
        query = query.where('rating', '>=', filters.rating);
      }
      
      const snapshot = await query.orderBy('rating', 'desc').limit(20).get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching artists:', error);
      throw error;
    }
  },

  async getArtistById(artistId) {
    try {
      const doc = await db.collection(COLLECTIONS.ARTISTS).doc(artistId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching artist:', error);
      throw error;
    }
  },

  // Bookings
  async createBooking(bookingData) {
    try {
      const booking = {
        ...bookingData,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection(COLLECTIONS.BOOKINGS).add(booking);
      return docRef.id;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  async updateBookingStatus(bookingId, status) {
    try {
      await db.collection(COLLECTIONS.BOOKINGS).doc(bookingId).update({
        status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Reviews
  async getReviews(artistId = null, limit = 10) {
    try {
      let query = db.collection(COLLECTIONS.REVIEWS);
      
      if (artistId) {
        query = query.where('artistId', '==', artistId);
      }
      
      const snapshot = await query
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  async addReview(reviewData) {
    try {
      const review = {
        ...reviewData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection(COLLECTIONS.REVIEWS).add(review);
      
      // Update artist's average rating
      await this.updateArtistRating(reviewData.artistId);
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },

  async updateArtistRating(artistId) {
    try {
      const reviewsSnapshot = await db.collection(COLLECTIONS.REVIEWS)
        .where('artistId', '==', artistId)
        .get();
      
      if (reviewsSnapshot.empty) return;
      
      const reviews = reviewsSnapshot.docs.map(doc => doc.data());
      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      const totalReviews = reviews.length;
      
      await db.collection(COLLECTIONS.ARTISTS).doc(artistId).update({
        rating: parseFloat(averageRating.toFixed(1)),
        totalReviews: totalReviews
      });
    } catch (error) {
      console.error('Error updating artist rating:', error);
      throw error;
    }
  },

  // Services
  async getServices() {
    try {
      const snapshot = await db.collection(COLLECTIONS.SERVICES).get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Authentication
  async signInAnonymously() {
    try {
      const result = await auth.signInAnonymously();
      return result.user;
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Storage
  async uploadImage(file, path) {
    try {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(path);
      const snapshot = await imageRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Search
  async searchArtists(searchTerm) {
    try {
      const snapshot = await db.collection(COLLECTIONS.ARTISTS)
        .where('searchKeywords', 'array-contains', searchTerm.toLowerCase())
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error searching artists:', error);
      throw error;
    }
  }
};

// Sample Data for Development
const SAMPLE_DATA = {
  artists: [
    {
      id: 'artist1',
      name: 'Sofia Martinez',
      specialty: 'Bridal Makeup',
      specialties: ['bridal', 'event'],
      location: 'New York, NY',
      rating: 4.9,
      totalReviews: 127,
      price: 150,
      image: 'https://images.unsplash.com/photo-1594736797933-d0d8bb2bf9d4?w=400&h=400&fit=crop&crop=face',
      bio: 'Specialized in bridal and special event makeup with over 8 years of experience.',
      portfolio: [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop'
      ],
      services: ['Bridal Makeup', 'Party Makeup', 'Photoshoot'],
      availability: ['2024-01-15', '2024-01-16', '2024-01-17'],
      searchKeywords: ['sofia', 'martinez', 'bridal', 'makeup', 'new york']
    },
    {
      id: 'artist2',
      name: 'Maya Chen',
      specialty: 'Editorial Makeup',
      specialties: ['editorial', 'fashion'],
      location: 'Los Angeles, CA',
      rating: 4.8,
      totalReviews: 94,
      price: 200,
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop&crop=face',
      bio: 'Editorial and fashion makeup artist working with top photographers and models.',
      portfolio: [
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1580869889710-28d3ecf39b7a?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop'
      ],
      services: ['Editorial Makeup', 'Fashion Shoots', 'Creative Looks'],
      availability: ['2024-01-15', '2024-01-18', '2024-01-19'],
      searchKeywords: ['maya', 'chen', 'editorial', 'fashion', 'los angeles']
    },
    {
      id: 'artist3',
      name: 'Alex Rivera',
      specialty: 'Special Effects',
      specialties: ['special-effects', 'theatrical'],
      location: 'Chicago, IL',
      rating: 4.7,
      totalReviews: 76,
      price: 300,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Special effects and theatrical makeup artist for film, TV, and theater productions.',
      portfolio: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609205851336-a2302c2e5dd8?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1541855659-1b6940b62bb7?w=300&h=300&fit=crop'
      ],
      services: ['SFX Makeup', 'Prosthetics', 'Character Design'],
      availability: ['2024-01-16', '2024-01-17', '2024-01-20'],
      searchKeywords: ['alex', 'rivera', 'special', 'effects', 'chicago']
    }
  ],
  
  reviews: [
    {
      id: 'review1',
      artistId: 'artist1',
      clientName: 'Emma Thompson',
      rating: 5,
      text: 'Sofia did an absolutely amazing job on my wedding day! The makeup lasted all day and looked flawless in all our photos.',
      date: new Date('2024-01-10'),
      service: 'Bridal Makeup'
    },
    {
      id: 'review2',
      artistId: 'artist2',
      clientName: 'Jessica Park',
      rating: 5,
      text: 'Maya is incredibly talented! The editorial look she created for my photoshoot was beyond my expectations.',
      date: new Date('2024-01-08'),
      service: 'Editorial Makeup'
    },
    {
      id: 'review3',
      artistId: 'artist1',
      clientName: 'Sarah Johnson',
      rating: 5,
      text: 'Professional, punctual, and incredibly skilled. Sofia made me feel so beautiful on my special day!',
      date: new Date('2024-01-05'),
      service: 'Bridal Makeup'
    }
  ]
};

// Initialize sample data for development
const initializeSampleData = async () => {
  try {
    // Check if data already exists
    const artistsSnapshot = await db.collection(COLLECTIONS.ARTISTS).limit(1).get();
    
    if (artistsSnapshot.empty) {
      console.log('Initializing sample data...');
      
      // Add sample artists
      for (const artist of SAMPLE_DATA.artists) {
        await db.collection(COLLECTIONS.ARTISTS).doc(artist.id).set(artist);
      }
      
      // Add sample reviews
      for (const review of SAMPLE_DATA.reviews) {
        await db.collection(COLLECTIONS.REVIEWS).doc(review.id).set(review);
      }
      
      console.log('Sample data initialized successfully!');
    }
  } catch (error) {
    console.log('Using sample data for development mode');
  }
};

// Initialize sample data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize in development mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initializeSampleData();
  }
});

// Export for use in other files
window.FirebaseService = FirebaseService;
window.SAMPLE_DATA = SAMPLE_DATA;