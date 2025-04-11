// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
        // Mark the current page link as active
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
        
        // Add click event listeners to navigation links for transition effect
        navLinks.forEach(link => {
            // Skip the "Coming Soon" link
            if (link.id === 'coming-soon') return;
            
            link.addEventListener('click', function(e) {
                const targetHref = this.getAttribute('href');
                
                // If it's not an anchor link within the same page
                if (!targetHref.startsWith('#')) {
                    e.preventDefault(); // Prevent default navigation
                    
                    // Add the transition class to the body
                    document.body.classList.add('page-transition');
                    
                    // Navigate to the new page after transition completes
                    setTimeout(() => {
                        window.location.href = targetHref;
                    }, 10); // Match this with the transition duration in CSS
                }
            });
        });
        
        // Apply entry animation when the page loads
        window.addEventListener('load', function() {
            // If coming from another page, reset the opacity
            document.body.style.opacity = 1;
            document.body.classList.remove('page-transition');
            
            // Add a class to the main content to trigger the animation
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.style.opacity = 0;
                setTimeout(() => {
                    mainContent.style.opacity = 1;
                }, 10);
            }
        });
    });