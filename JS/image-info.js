document.addEventListener('DOMContentLoaded', () => {
    // Get all the image elements with the class 'clickable-image'
    const galleryImages = document.querySelectorAll('.gallery-grid .clickable-image');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;

    // Function to open the modal
    function openModal(index) {
        currentImageIndex = index;
        const image = galleryImages[currentImageIndex];
        const parentItem = image.closest('.gallery-item');
        const description = parentItem.querySelector('.description').textContent;
        const location = parentItem.querySelector('.image-location').textContent;
        const date = parentItem.querySelector('.image-date').textContent;
        
        modal.style.display = "flex";
        modalImg.src = image.src;
        modalCaption.innerHTML = `<span>${description}</span><br><span>Location: ${location}</span><br><span>Date: ${date}</span>`;
    }

    // Function to close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside of the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Add click event listeners to each image in the gallery
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            openModal(index);
        });
    });

    // Function to show the next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openModal(currentImageIndex);
    }

    // Function to show the previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openModal(currentImageIndex);
    }

    // Add click event listeners to the navigation buttons
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the modal from closing
        showNextImage();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the modal from closing
        showPrevImage();
    });

    // Add keyboard navigation for the modal
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowLeft") {
                showPrevImage();
            } else if (e.key === "ArrowRight") {
                showNextImage();
            } else if (e.key === "Escape") {
                modal.style.display = "none";
            }
        }
    });
});