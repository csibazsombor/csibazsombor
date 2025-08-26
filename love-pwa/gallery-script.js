function showGallery() {
        const container = document.querySelector('.container');
        container.innerHTML = `
        <h1>Our Gallery💗</h1>
        <div class="gallery">
        <img src="Images/IMG_20250824_100846_110.jpg" alt="Image 1">
        <img src="Images/IMG_20250826_123404_967.jpg" alt="Image 2">
        <img src="image3.jpg" alt="Image 3">
        <img src="image4.jpg" alt="Image 4">
        <img src="image5.jpg" alt="Image 5">
        </div>
        <button onclick="location.reload()">Back</button>
        `;
}