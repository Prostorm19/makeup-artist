// Artists functionality
function displayArtists(artists) {
    const grid = document.getElementById('artists-grid');
    if (!grid) return;
    
    grid.innerHTML = artists.map(artist => `
        <div class="artist-card fade-in-up" data-artist-id="${artist.id}">
            <img src="${artist.image}" alt="${artist.name}" class="artist-image">
            <div class="artist-overlay">
                <h3 class="artist-name">${artist.name}</h3>
                <p class="artist-specialty">${artist.specialty}</p>
                <div class="artist-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(artist.rating))}${'☆'.repeat(5 - Math.floor(artist.rating))}
                    </div>
                    <span>${artist.rating} (${artist.totalReviews} reviews)</span>
                </div>
                <p class="artist-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${artist.location}
                </p>
                <p class="artist-price">Starting from $${artist.price}</p>
            </div>
        </div>
    `).join('');
    
    // Add click listeners to artist cards
    grid.querySelectorAll('.artist-card').forEach(card => {
        card.addEventListener('click', () => {
            const artistId = card.dataset.artistId;
            showArtistModal(artistId);
        });
    });
}

async function showArtistModal(artistId) {
    try {
        let artist = await FirebaseService.getArtistById(artistId);
        
        // Fallback to sample data
        if (!artist) {
            artist = SAMPLE_DATA.artists.find(a => a.id === artistId);
        }
        
        if (!artist) return;
        
        const modal = document.getElementById('artist-modal');
        const content = document.getElementById('artist-modal-content');
        
        content.innerHTML = `
            <div class="artist-profile">
                <div class="artist-header">
                    <img src="${artist.image}" alt="${artist.name}" class="artist-avatar avatar-xl">
                    <div class="artist-info">
                        <h2>${artist.name}</h2>
                        <p class="artist-specialty">${artist.specialty}</p>
                        <div class="artist-rating">
                            <div class="stars">
                                ${'★'.repeat(Math.floor(artist.rating))}${'☆'.repeat(5 - Math.floor(artist.rating))}
                            </div>
                            <span>${artist.rating} (${artist.totalReviews} reviews)</span>
                        </div>
                        <p class="artist-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${artist.location}
                        </p>
                    </div>
                </div>
                
                <div class="artist-bio">
                    <h4>About</h4>
                    <p>${artist.bio}</p>
                </div>
                
                <div class="artist-services">
                    <h4>Services</h4>
                    <div class="service-tags">
                        ${artist.services.map(service => `<span class="badge badge-primary">${service}</span>`).join('')}
                    </div>
                </div>
                
                <div class="artist-portfolio">
                    <h4>Portfolio</h4>
                    <div class="gallery">
                        ${artist.portfolio.map(image => `
                            <div class="gallery-item">
                                <img src="${image}" alt="Portfolio" class="gallery-image">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="artist-actions">
                    <button class="btn btn-primary btn-large" onclick="openBookingModal('${artist.id}')">
                        <i class="fas fa-calendar"></i>
                        Book Appointment
                    </button>
                    <button class="btn btn-outline" onclick="contactArtist('${artist.id}')">
                        <i class="fas fa-message"></i>
                        Send Message
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
    } catch (error) {
        showToast('Error loading artist details', 'error');
    }
}

function contactArtist(artistId) {
    showToast('Message feature coming soon!', 'info');
}

// Modal close functionality
document.addEventListener('click', (e) => {
    if (e.target.id === 'close-modal' || e.target.closest('#close-modal')) {
        document.getElementById('artist-modal').classList.remove('active');
    }
    
    if (e.target.id === 'artist-modal') {
        document.getElementById('artist-modal').classList.remove('active');
    }
});