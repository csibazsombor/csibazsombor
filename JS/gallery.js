// ======================
// Gallery Search & Filter System
// ======================

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("gallery-search");
  const searchBtn = document.getElementById("search-btn");
  const locationFilter = document.getElementById("location-filter");
  const yearFilter = document.getElementById("year-filter");
  const resetBtn = document.getElementById("reset-filters");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const emptyGallery = document.getElementById("empty-gallery");

  function filterGallery() {
    const query = searchInput.value.toLowerCase().trim();
    const location = locationFilter.value;
    const year = yearFilter.value;

    let visibleCount = 0;

    galleryItems.forEach(item => {
      const img = item.querySelector("img");

      // get attributes
      const itemLocation = item.dataset.location || "";
      const itemDate = item.dataset.date || "";
      const itemYear = itemDate.split(".")[0]; // first part = year
      const itemTags = item.dataset.tags || "";
      const altText = img.alt || "";

      // check conditions
      const matchesSearch =
        !query ||
        altText.toLowerCase().includes(query) ||
        itemTags.toLowerCase().includes(query) ||
        itemLocation.toLowerCase().includes(query);

      const matchesLocation = !location || itemLocation === location;
      const matchesYear = !year || itemYear === year;

      if (matchesSearch && matchesLocation && matchesYear) {
        item.style.display = "";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });
    
    // toggle "empty gallery" message
    emptyGallery.style.display = visibleCount === 0 ? "block" : "none";
  }

  // Events
  searchBtn.addEventListener("click", filterGallery);
  locationFilter.addEventListener("change", filterGallery);
  yearFilter.addEventListener("change", filterGallery);

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    locationFilter.value = "";
    yearFilter.value = "";
    filterGallery();
  });

  // initial run
  filterGallery();
});

function filterByCountry(country) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        if(item.getAttribute('data-location') === country) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
