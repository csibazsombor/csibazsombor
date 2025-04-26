// Lazy Loading Function for Gallery Images
function implementLazyLoading() {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                  img.src = src;
                  img.removeAttribute('data-src');
                  img.classList.add('loaded');
                }
                
                observer.unobserve(img);
              }
            });
          });
          
          // Convert existing gallery images to use lazy loading
          document.querySelectorAll('.gallery-item img').forEach(img => {
            // Store original src in data-src
            const originalSrc = img.src;
            img.setAttribute('data-src', originalSrc);
            
            // Set a placeholder or very small image as temporary src
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3C/svg%3E';
            
            // Add loading class for styling
            img.classList.add('loading');
            
            // Observe the image
            imageObserver.observe(img);
          });
          
          // Add CSS for lazy loading animations
          const style = document.createElement('style');
          style.textContent = `
            .gallery-item img.loading {
              opacity: 0.2;
              transition: opacity 0.3s ease-in-out;
            }
            
            .gallery-item img.loaded {
              opacity: 1;
            }
          `;
          document.head.appendChild(style);
        }
      }
      
      // Add function to modify future gallery additions to use lazy loading
      function prepareLazyImage(imgElement) {
        const originalSrc = imgElement.src;
        imgElement.setAttribute('data-src', originalSrc);
        imgElement.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3C/svg%3E';
        imgElement.classList.add('loading');
        
        if (window.imageObserver) {
          window.imageObserver.observe(imgElement);
        }
      }
      
      // Call the function when the page loads
      document.addEventListener('DOMContentLoaded', implementLazyLoading);