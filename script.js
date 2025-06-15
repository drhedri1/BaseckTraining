// Baseck Training Landing Page JavaScript
// Implements scroll-reveal animations, testimonial rotation, FAQ accordion, 
// exit-intent modal, and live counter functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Testimonial Data
    const testimonials = [
        {
            quote: "The motivation, support, and friendship I've found at Baseck Training are unmatched… The nutrition plan has completely changed the way I think about food.",
            author: "<strong>Real Client</strong> - Baseck Training Member"
        },
        {
            quote: "I was on the verge of giving up on my health… Baseck educated me on how to build a healthy lifestyle that actually lasts.",
            author: "<strong>Real Client</strong> - Baseck Training Member"
        },
        {
            quote: "What really stood out was the personal attention and pressure free approach. I'm enjoying the journey and seeing results I didn't think were possible.",
            author: "<strong>Real Client</strong> - Baseck Training Member"
        },
        {
            quote: "The GAIT training approach is brilliant. Everything is customized to my body and goals. I've never felt more confident about my fitness journey.",
            author: "<strong>Tiff</strong> - Lost 36 lbs, 7.1% body fat"
        },
        {
            quote: "Baseck Training changed my life completely. The results speak for themselves and the community support is incredible.",
            author: "<strong>Daniel</strong> - Lost 21 lbs, 4\" waist"
        },
        {
            quote: "The flexible scheduling and efficient workouts fit perfectly into my busy lifestyle. Real results in just 30 minutes!",
            author: "<strong>Rich</strong> - Lost 30 lbs, major energy boost"
        }
    ];
    
    // Scroll Reveal Animation
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // Testimonial Rotation
    function initTestimonialRotation() {
        const quoteElement = document.getElementById('rotating-quote');
        const authorElement = document.getElementById('rotating-author');
        const navDots = document.querySelectorAll('.nav-dot');
        
        let currentIndex = 0;
        let rotationInterval;
        let isPaused = false;
        
        function updateTestimonial(index) {
            if (quoteElement && authorElement) {
                // Fade out
                quoteElement.style.opacity = '0';
                authorElement.style.opacity = '0';
                
                setTimeout(() => {
                    quoteElement.textContent = `"${testimonials[index].quote}"`;
                    authorElement.innerHTML = testimonials[index].author;
                    
                    // Update nav dots
                    navDots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                    
                    // Fade in
                    quoteElement.style.opacity = '1';
                    authorElement.style.opacity = '1';
                }, 200);
            }
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial(currentIndex);
        }
        
        function startRotation() {
            if (!isPaused) {
                rotationInterval = setInterval(nextTestimonial, 5000);
            }
        }
        
        function stopRotation() {
            clearInterval(rotationInterval);
        }
        
        // Nav dot click handlers
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateTestimonial(currentIndex);
                stopRotation();
                startRotation();
            });
        });
        
        // Pause on hover
        const testimonialSection = document.querySelector('.testimonial-rotator');
        if (testimonialSection) {
            testimonialSection.addEventListener('mouseenter', () => {
                isPaused = true;
                stopRotation();
            });
            
            testimonialSection.addEventListener('mouseleave', () => {
                isPaused = false;
                startRotation();
            });
        }
        
        // Pause when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isPaused = true;
                stopRotation();
            } else {
                isPaused = false;
                startRotation();
            }
        });
        
        // Initialize
        updateTestimonial(0);
        startRotation();
        
        // Add smooth transitions
        if (quoteElement && authorElement) {
            quoteElement.style.transition = 'opacity 0.3s ease';
            authorElement.style.transition = 'opacity 0.3s ease';
        }
    }
    
    // FAQ Accordion
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }
    
    // Live Counter Animation
    function initLiveCounter() {
        const counterElement = document.getElementById('impact-counter');
        if (!counterElement) return;
        
        const targetValue = 14300;
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        function updateCounter() {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                counterElement.textContent = `$${currentValue.toLocaleString()}`;
                return;
            }
            
            counterElement.textContent = `$${Math.floor(currentValue).toLocaleString()}`;
            requestAnimationFrame(updateCounter);
        }
        
        // Start counter when element comes into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counterElement);
    }
    
    // Sticky Footer Bar
    function initStickyFooter() {
        const stickyBar = document.querySelector('.sticky-footer-bar');
        if (!stickyBar) return;
        
        let lastScrollY = window.scrollY;
        let isVisible = false;
        
        function updateStickyBar() {
            const currentScrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollPercentage = currentScrollY / (documentHeight - windowHeight);
            
            // Show sticky bar after 50% scroll or when scrolling up
            const shouldShow = scrollPercentage > 0.5 || (currentScrollY < lastScrollY && currentScrollY > 200);
            
            if (shouldShow && !isVisible) {
                stickyBar.classList.add('visible');
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                stickyBar.classList.remove('visible');
                isVisible = false;
            }
            
            lastScrollY = currentScrollY;
        }
        
        window.addEventListener('scroll', updateStickyBar);
    }
    
    // Exit-Intent Modal
    function initExitIntentModal() {
        const modal = document.getElementById('exit-modal');
        const closeButton = modal?.querySelector('.modal-close');
        const overlay = modal?.querySelector('.modal-overlay');
        const timerElement = document.getElementById('timer-countdown');
        
        if (!modal) return;
        
        let hasShown = false;
        let timer = 30;
        let timerInterval;
        
        function showModal() {
            if (hasShown) return;
            
            modal.classList.add('visible');
            hasShown = true;
            
            // Start countdown timer
            timerInterval = setInterval(() => {
                timer--;
                if (timerElement) {
                    timerElement.textContent = timer;
                }
                
                if (timer <= 0) {
                    hideModal();
                }
            }, 1000);
        }
        
        function hideModal() {
            modal.classList.remove('visible');
            clearInterval(timerInterval);
        }
        
        // Exit intent detection
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                showModal();
            }
        });
        
        // Close modal handlers
        closeButton?.addEventListener('click', hideModal);
        overlay?.addEventListener('click', hideModal);
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('visible')) {
                hideModal();
            }
        });
    }
    
    // CTA Button Click Handlers
    function initCTAHandlers() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = this.textContent.trim();
                
                // Analytics tracking would go here
                console.log('CTA clicked:', buttonText);
                
                // For demo purposes
                if (buttonText.includes('BOOK') || buttonText.includes('STRATEGY')) {
                    e.preventDefault();
                    alert('Thank you for your interest! In a real implementation, this would open a booking form or redirect to a scheduling page.');
                } else if (buttonText.includes('FREE SESSIONS') || buttonText.includes('CLAIM')) {
                    e.preventDefault();
                    alert('Awesome! In a real implementation, this would open a form to claim your 2 free sessions.');
                } else if (buttonText.includes('CUSTOM PLAN') || buttonText.includes('START')) {
                    e.preventDefault();
                    alert('Great choice! In a real implementation, this would start the custom plan creation process.');
                }
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^=\"#\"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Hero Video Play Button
    function initVideoPlayButton() {
        const playButton = document.querySelector('.play-button');
        
        if (playButton) {
            playButton.addEventListener('click', function() {
                // In a real implementation, this would play the actual video
                alert('In a real implementation, this would play a video showcasing the studio and training approach.');
            });
        }
    }
    
    // Lazy Loading for Images (placeholder for when real images are added)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize all functionality
    initScrollReveal();
    initTestimonialRotation();
    initFAQAccordion();
    initLiveCounter();
    initStickyFooter();
    initExitIntentModal();
    initCTAHandlers();
    initSmoothScrolling();
    initVideoPlayButton();
    initLazyLoading();
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function throttleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-dependent functions are already optimized with their own throttling
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttleScroll);
    
    // Accessibility: Focus management for modal
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    // Apply focus trap to modal when it becomes visible
    const modal = document.getElementById('exit-modal');
    if (modal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (modal.classList.contains('visible')) {
                        trapFocus(modal);
                        // Focus the first button in the modal
                        const firstButton = modal.querySelector('button');
                        if (firstButton) {
                            setTimeout(() => firstButton.focus(), 100);
                        }
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true });
    }
});
