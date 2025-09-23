    function showModal(modalId) {
      document.getElementById(modalId).style.display = 'flex';
    }

    function closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
    }
    
    function showGallery() {
      document.getElementById('galleryModal').style.display = 'flex';
      if (allPhotos.length === 0) initializeGallery();
    }

    function closeGallery() {
      document.getElementById('galleryModal').style.display = 'none';
      if (isSlideshow) stopSlideshow();
    }
    // Gallery Functions
    function toggleSlideshow() {
      if (isSlideshow) {
        stopSlideshow();
      } else {
        startSlideshow();
      }
    }

    function startSlideshow() {
      isSlideshow = true;
      currentImageIndex = 0;
      document.getElementById('slideshowModal').style.display = 'flex';
      updateSlideshowImage();
      slideshowInterval = setInterval(nextSlideshowImage, 3000);
      document.getElementById('slideshowBtn').textContent = '⏹️ Stop';
    }

    function stopSlideshow() {
      isSlideshow = false;
      clearInterval(slideshowInterval);
      document.getElementById('slideshowModal').style.display = 'none';
      document.getElementById('slideshowBtn').textContent = '▶️ Slideshow';
    }

    function pauseSlideshow() {
      clearInterval(slideshowInterval);
      document.getElementById('pauseBtn').style.display = 'none';
      document.getElementById('playBtn').style.display = 'inline-block';
    }

    function resumeSlideshow() {
      const speed = parseInt(document.getElementById('speedControl').value);
      slideshowInterval = setInterval(nextSlideshowImage, speed);
      document.getElementById('pauseBtn').style.display = 'inline-block';
      document.getElementById('playBtn').style.display = 'none';
    }

    function changeSpeed() {
      if (isSlideshow) {
        clearInterval(slideshowInterval);
        const speed = parseInt(document.getElementById('speedControl').value);
        slideshowInterval = setInterval(nextSlideshowImage, speed);
      }
    }

    function nextSlideshowImage() {
      currentImageIndex = (currentImageIndex + 1) % filteredPhotos.length;
      updateSlideshowImage();
    }

    function updateSlideshowImage() {
      const photo = filteredPhotos[currentImageIndex];
      document.getElementById('slideshowImage').src = photo.src;
      document.getElementById('slideshowTitle').textContent = photo.alt;
      document.getElementById('slideshowMemory').textContent = photo.memory;
    }

    function shuffleGallery() {
      filteredPhotos = [...filteredPhotos].sort(() => Math.random() - 0.5);
      renderGallery();
    }

    function showFavorites() {
      if (favorites.length === 0) {
        alert('No favorite photos yet! Heart some photos to see them here.');
        return;
      }
      filteredPhotos = allPhotos.filter(photo => favorites.includes(photo.id));
      renderGallery();
      updatePhotoStats();
    }

    function sortByDate() {
      filteredPhotos = [...filteredPhotos].sort((a, b) => new Date(b.date) - new Date(a.date));
      renderGallery();
    }

    function toggleGridView() {
      isGridView = !isGridView;
      const gallery = document.getElementById('galleryGrid');
      gallery.className = isGridView ? 'grid-view' : 'list-view';
      document.querySelector('#galleryControls button:last-child').textContent = 
        isGridView ? '📋 List View' : '🔲 Grid View';
    }

    function searchPhotos() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      if (query === '') {
        filteredPhotos = [...allPhotos];
      } else {
        filteredPhotos = allPhotos.filter(photo => 
          photo.memory.toLowerCase().includes(query) || 
          photo.alt.toLowerCase().includes(query)
        );
      }
      renderGallery();
      updatePhotoStats();
    }

    function clearSearch() {
      document.getElementById('searchInput').value = '';
      filteredPhotos = [...allPhotos];
      renderGallery();
      updatePhotoStats();
    }

    function populateYearFilter() {
      const years = [...new Set(allPhotos.map(photo => photo.date.substring(0, 4)))].sort();
      const yearFilter = document.getElementById('yearFilter');
      years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
      });
    }

    function filterByYear() {
      const year = document.getElementById('yearFilter').value;
      if (year === '') {
        filteredPhotos = [...allPhotos];
      } else {
        filteredPhotos = allPhotos.filter(photo => photo.date.startsWith(year));
      }
      renderGallery();
      updatePhotoStats();
    }

    function filterByMonth() {
      const month = document.getElementById('monthFilter').value;
      if (month === '') {
        filteredPhotos = [...allPhotos];
      } else {
        filteredPhotos = allPhotos.filter(photo => photo.date.substring(5, 7) === month);
      }
      renderGallery();
      updatePhotoStats();
    }

    function renderGallery() {
      const gallery = document.getElementById('galleryGrid');
      gallery.innerHTML = '';
      filteredPhotos.forEach((photo, index) => {
        photo.element.style.display = 'block';
        photo.img.onclick = () => viewFullImage(photo.img, index);
        gallery.appendChild(photo.element);
      });
    }

    function updatePhotoStats() {
      document.getElementById('photoCount').textContent = `${filteredPhotos.length} photos`;
      document.getElementById('favoriteCount').textContent = `${favorites.length} favorites`;
      
      if (filteredPhotos.length > 0) {
        const dates = filteredPhotos.map(photo => new Date(photo.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const minYear = minDate.getFullYear();
        const maxYear = maxDate.getFullYear();
        document.getElementById('dateRange').textContent = 
          minYear === maxYear ? minYear : `${minYear} - ${maxYear}`;
      }
    }

    function toggleFavorite(photoId, element) {
      if (favorites.includes(photoId)) {
        favorites = favorites.filter(id => id !== photoId);
        element.textContent = '🤍';
        element.classList.remove('favorited');
      } else {
        favorites.push(photoId);
        element.textContent = '❤️';
        element.classList.add('favorited');
      }
      localStorage.setItem('photoFavorites', JSON.stringify(favorites));
      updatePhotoStats();
    }

    function loadFavorites() {
      favorites.forEach(photoId => {
        const favoriteBtn = document.querySelector(`[onclick="toggleFavorite(${photoId}, this)"]`);
        if (favoriteBtn) {
          favoriteBtn.textContent = '❤️';
          favoriteBtn.classList.add('favorited');
        }
      });
    }


    function closeFullImage() {
      document.getElementById('fullImageModal').style.display = 'none';
      resetZoom();
    }

    function previousImage() {
      currentImageIndex = (currentImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      viewFullImage(filteredPhotos[currentImageIndex].img, currentImageIndex);
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % filteredPhotos.length;
      viewFullImage(filteredPhotos[currentImageIndex].img, currentImageIndex);
    }

    // Fullscreen Favorite toggle
    function toggleFullscreenFavorite() {
      const photo = filteredPhotos[currentImageIndex];
      const fullFavBtn = document.getElementById('fullFavoriteBtn');
      if (favorites.includes(photo.id)) {
        favorites = favorites.filter(id => id !== photo.id);
        fullFavBtn.textContent = '🤍 Add to Favorites';
      } else {
        favorites.push(photo.id);
        fullFavBtn.textContent = '❤️ Remove from Favorites';
      }
      localStorage.setItem('photoFavorites', JSON.stringify(favorites));
      updatePhotoStats();
      loadFavorites();
    }

    // Zoom Functions
    function zoomIn() {
      zoomLevel += 0.1;
      document.getElementById('fullImage').style.transform = `scale(${zoomLevel})`;
    }

    function zoomOut() {
      if (zoomLevel > 0.2) {
        zoomLevel -= 0.1;
        document.getElementById('fullImage').style.transform = `scale(${zoomLevel})`;
      }
    }

    function resetZoom() {
      zoomLevel = 1;
      document.getElementById('fullImage').style.transform = 'scale(1)';
    }

    function downloadPhoto() {
      const photo = filteredPhotos[currentImageIndex];
      const link = document.createElement('a');
      link.href = photo.src;
      link.download = photo.alt || 'photo';
      link.click();
    }


    