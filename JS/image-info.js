// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const galleryGrid = document.getElementById('gallery-grid');
    const emptyGallery = document.getElementById('empty-gallery');
    const searchInput = document.getElementById('gallery-search');
    const searchBtn = document.getElementById('search-btn');
    const locationFilter = document.getElementById('location-filter');
    const yearFilter = document.getElementById('year-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    // Modal functionality
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const caption = document.getElementById("modal-caption");
    const closeBtn = document.querySelector(".close-btn");
    
    // Initialize the gallery
    initGallery();
    
    // Function to initialize gallery
    function initGallery() {
        // Show/hide placeholder based on if there are images
        updateGalleryVisibility();
        
        // Set up event listeners for images
        document.querySelectorAll('.clickable-image').forEach(img => {
            img.addEventListener('click', openModal);
        });
        
        // Populate location and year filters with unique values
        populateFilters();
        
        // Set up search and filter events
        searchBtn.addEventListener('click', applyFilters);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
        
        locationFilter.addEventListener('change', applyFilters);
        yearFilter.addEventListener('change', applyFilters);
        resetFiltersBtn.addEventListener('click', resetFilters);
        
        // Modal close event
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
        
        // Close modal by clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
    
    // Function to open image modal
    function openModal() {
        const parentItem = this.closest('.gallery-item');
        
        modal.style.display = "block";
        modalImg.src = this.src;
        
        // Create caption with metadata
        caption.innerHTML = `
            <strong>Location:</strong> ${parentItem.dataset.location} <br>
            <strong>Date:</strong> ${parentItem.dataset.date}
            ${parentItem.dataset.tags ? '<br><strong>Tags:</strong> ' + formatTags(parentItem.dataset.tags) : ''}
        `;
    }
    
    // Format tags for display (convert comma-separated to space-separated)
    function formatTags(tagsString) {
        return tagsString.split(',').map(tag => `#${tag.trim()}`).join(' ');
    }
    
    // Function to populate filters with unique values
    function populateFilters() {
        const locations = new Set();
        const years = new Set();
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            // Extract location (first part before comma)
            const location = item.dataset.location.split(',')[0].trim();
            locations.add(location);
            
            // Extract year from date (assuming YYYY.MM.DD format)
            const year = item.dataset.date.split('.')[0];
            years.add(year);
        });
        
        // Clear existing options except the first one
        while (locationFilter.options.length > 1) {
            locationFilter.remove(1);
        }
        
        while (yearFilter.options.length > 1) {
            yearFilter.remove(1);
        }
        
        // Add new options
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
        
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }
    
    // Function to apply search and filters
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const locationValue = locationFilter.value;
        const yearValue = yearFilter.value;
        
        let hasVisibleItems = false;
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            const location = item.dataset.location.toLowerCase();
            const date = item.dataset.date;
            const year = date.split('.')[0];
            const tags = item.dataset.tags ? item.dataset.tags.toLowerCase() : '';
            
            // Check if item matches all active filters
            const matchesSearch = !searchTerm || 
                                  location.includes(searchTerm) || 
                                  tags.includes(searchTerm);
            
            const matchesLocation = !locationValue || 
                                    location.startsWith(locationValue.toLowerCase());
            
            const matchesYear = !yearValue || year === yearValue;
            
            // Show or hide based on filter match
            if (matchesSearch && matchesLocation && matchesYear) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show placeholder if no items match
        updateGalleryVisibility(hasVisibleItems);
    }
    
    // Function to reset all filters
    function resetFilters() {
        searchInput.value = '';
        locationFilter.value = '';
        yearFilter.value = '';
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.display = 'block';
        });
        
        updateGalleryVisibility(document.querySelectorAll('.gallery-item').length > 0);
    }
    
    // Update gallery visibility based on content
    function updateGalleryVisibility(hasVisibleItems = null) {
        if (hasVisibleItems === null) {
            // Check if there are any gallery items
            hasVisibleItems = document.querySelectorAll('.gallery-item').length > 0;
        }
        
        if (hasVisibleItems) {
            emptyGallery.style.display = 'none';
            galleryGrid.style.display = 'grid';
        } else {
            emptyGallery.style.display = 'block';
            galleryGrid.style.display = 'none';
        }
    }
    
    // Function to add a new image to the gallery (can be used later)
    function addImageToGallery(imgSrc, alt, location, date, tags = null) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.location = location;
        galleryItem.dataset.date = date;
        if (tags) galleryItem.dataset.tags = tags;
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = alt;
        img.className = 'clickable-image';
        img.addEventListener('click', openModal);
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'image-info';
        
        const locationSpan = document.createElement('span');
        locationSpan.className = 'image-location';
        locationSpan.textContent = location;
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'image-date';
        dateSpan.textContent = date;
        
        infoDiv.appendChild(locationSpan);
        infoDiv.appendChild(dateSpan);
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(infoDiv);
        
        galleryGrid.appendChild(galleryItem);
        
        // Update filters with new values
        populateFilters();
        updateGalleryVisibility();
    }
    
    // Make addImageToGallery function globally available (optional)
    window.addImageToGallery = addImageToGallery;
});