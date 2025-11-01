// Reviews functionality
let currentReviewIndex = 0;
let reviews = [];

function displayReviews(reviewsData) {
    reviews = reviewsData;
    const carousel = document.getElementById('reviews-carousel');
    const dotsContainer = document.getElementById('review-dots');
    
    if (!carousel || !dotsContainer) return;
    
    carousel.innerHTML = reviews.map((review, index) => `
        <div class="review-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <blockquote class="review-text">"${review.text}"</blockquote>
            <div class="review-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=60&h=60&fit=crop&crop=face" alt="${review.clientName}" class="review-avatar">
                <div class="review-info">
                    <h4>${review.clientName}</h4>
                    <p>Verified Client</p>
                    <div class="review-rating">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Create dots
    dotsContainer.innerHTML = reviews.map((_, index) => 
        `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
    ).join('');
    
    // Add event listeners
    setupReviewCarousel();
}

function setupReviewCarousel() {
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');
    const dots = document.querySelectorAll('#review-dots .dot');
    
    if (prevBtn) prevBtn.addEventListener('click', previousReview);
    if (nextBtn) nextBtn.addEventListener('click', nextReview);
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToReview(parseInt(dot.dataset.index));
        });
    });
    
    // Auto-advance reviews every 5 seconds
    setInterval(nextReview, 5000);
}

function previousReview() {
    currentReviewIndex = currentReviewIndex > 0 ? currentReviewIndex - 1 : reviews.length - 1;
    updateReviewDisplay();
}

function nextReview() {
    currentReviewIndex = currentReviewIndex < reviews.length - 1 ? currentReviewIndex + 1 : 0;
    updateReviewDisplay();
}

function goToReview(index) {
    currentReviewIndex = index;
    updateReviewDisplay();
}

function updateReviewDisplay() {
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('#review-dots .dot');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentReviewIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentReviewIndex);
    });
}