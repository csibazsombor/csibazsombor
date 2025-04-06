document.querySelectorAll('.clickable-image').forEach(img => {
    img.addEventListener('click', function () {
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-img");
        const caption = document.getElementById("modal-caption");

        modal.style.display = "block";
        modalImg.src = this.src;
        caption.innerHTML = `
    <strong>Location:</strong> ${this.dataset.location} <br>
    <strong>Date:</strong> ${this.dataset.date}
`;

    });
});

document.querySelector(".close-btn").addEventListener('click', function () {
    document.getElementById("image-modal").style.display = "none";
});

