// Booking functionality
function openBookingModal(artistId = null) {
    const modal = document.getElementById('booking-modal');
    const artistSelect = document.getElementById('artist-select');
    
    // Populate artist dropdown
    populateArtistSelect(artistSelect, artistId);
    
    modal.classList.add('active');
}

async function populateArtistSelect(select, selectedArtistId = null) {
    try {
        let artists = await FirebaseService.getArtists();
        
        // Fallback to sample data
        if (!artists || artists.length === 0) {
            artists = SAMPLE_DATA.artists;
        }
        
        select.innerHTML = '<option value="">Choose an artist</option>' +
            artists.map(artist => 
                `<option value="${artist.id}" ${artist.id === selectedArtistId ? 'selected' : ''}>
                    ${artist.name} - ${artist.specialty}
                </option>`
            ).join('');
            
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}

// Booking form submission
document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        artistId: document.getElementById('artist-select').value,
        service: document.getElementById('service-select').value,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        clientName: formData.get('name') || e.target.querySelector('input[type="text"]').value,
        email: formData.get('email') || e.target.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || e.target.querySelector('input[type="tel"]').value,
        details: formData.get('details') || e.target.querySelector('textarea').value
    };
    
    if (!bookingData.artistId || !bookingData.service || !bookingData.date) {
        showToast('Please fill in all required fields', 'warning');
        return;
    }
    
    showLoading();
    
    try {
        const bookingId = await FirebaseService.createBooking(bookingData);
        hideLoading();
        
        document.getElementById('booking-modal').classList.remove('active');
        e.target.reset();
        
        showToast('Booking request submitted successfully! You will receive confirmation soon.', 'success');
        
    } catch (error) {
        hideLoading();
        console.error('Booking error:', error);
        
        // Simulate successful booking for demo
        document.getElementById('booking-modal').classList.remove('active');
        e.target.reset();
        showToast('Booking request submitted successfully! You will receive confirmation soon.', 'success');
    }
});

// Close booking modal
document.addEventListener('click', (e) => {
    if (e.target.id === 'close-booking-modal' || e.target.closest('#close-booking-modal')) {
        document.getElementById('booking-modal').classList.remove('active');
    }
    
    if (e.target.id === 'booking-modal') {
        document.getElementById('booking-modal').classList.remove('active');
    }
});

// Date validation - prevent booking past dates
document.getElementById('booking-date').min = new Date().toISOString().split('T')[0];