// Enhanced JavaScript for Altiora Systems Homepage
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        function updateScrollIndicator() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            // Show/hide scroll indicator based on scroll position
            if (scrollTop > 200) {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
                scrollIndicator.style.transform = 'scale(1)';
            } else {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
                scrollIndicator.style.transform = 'scale(0.8)';
            }
            
            // Change icon based on scroll position
            if (scrollPercent > 80) {
                scrollIndicator.innerHTML = '↑';
                scrollIndicator.title = 'Back to top';
            } else {
                scrollIndicator.innerHTML = '↓';
                scrollIndicator.title = 'Scroll down';
            }
        }
        
        // Initial state check
        updateScrollIndicator();
        
        // Smooth scroll functionality
        scrollIndicator.addEventListener('click', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            if (scrollPercent > 80) {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Scroll to first section after hero
                const firstSection = document.querySelector('.solutions-section, .about-mission-vision, .contact-form-container');
                if (firstSection) {
                    firstSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        // Listen for scroll events
        window.addEventListener('scroll', updateScrollIndicator);
    }
    
    // Parallax effect removed for static hero background
    
    // Enhanced hover effects for solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale effect to other cards
            solutionCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.transform = 'scale(0.98) translateY(-4px)';
                    otherCard.style.opacity = '0.8';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset other cards
            solutionCards.forEach((otherCard) => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
            });
        });
    });
    
    // Enhanced CTA button interactions
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = ctaButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            ctaButton.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add ripple animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced logo interaction
    const logoSection = document.querySelector('.logo-section');
    
    if (logoSection) {
        logoSection.addEventListener('click', function() {
            // Smooth scroll to top
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }
    
    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function throttledScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollIndicator();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttledScroll);
    
    // Add subtle loading completion effect
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Add loading completion effect for about page
    setTimeout(() => {
        document.body.classList.add('loaded');
        // Trigger staggered animations for about page sections
        if (document.querySelector('.about-page')) {
            const sections = [
                '.about-hero-section',
                '.about-mission-vision', 
                '.about-products-section',
                '.about-team-section',
                '.about-cta-section'
            ];
            
            sections.forEach((selector, index) => {
                const section = document.querySelector(selector);
                if (section) {
                    setTimeout(() => {
                        section.style.animationDelay = `${index * 0.2}s`;
                        section.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }
    }, 100);
    
    console.log('🚀 Altiora Systems homepage enhanced JavaScript loaded successfully!');
    
    // Contact form validation and interactivity for contact.html
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitButton = contactForm.querySelector('.submit-button');
        
        // Add required asterisks to labels (except subject)
        function addAsterisks() {
            [nameInput, emailInput, messageInput].forEach(input => {
                const label = contactForm.querySelector(`label[for="${input.id}"]`);
                if (label && !label.querySelector('.required-asterisk')) {
                    const asterisk = document.createElement('span');
                    asterisk.textContent = ' *';
                    asterisk.className = 'required-asterisk';
                    label.appendChild(asterisk);
                }
            });
        }
        addAsterisks();

        // Subject is optional, so remove required attribute if present
        if (subjectInput) subjectInput.removeAttribute('required');

        function validateEmail(email) {
            // Must include @ and at least one character before and after
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function setFieldState(input, valid) {
            if (valid) {
                input.classList.remove('invalid');
                input.setAttribute('aria-invalid', 'false');
            } else {
                input.classList.add('invalid');
                input.setAttribute('aria-invalid', 'true');
            }
        }

        function validateForm() {
            const nameValid = nameInput.value.trim().length > 0;
            const emailValid = validateEmail(emailInput.value.trim());
            const messageValid = messageInput.value.trim().length > 0;
            setFieldState(nameInput, nameValid);
            setFieldState(emailInput, emailValid);
            setFieldState(messageInput, messageValid);
            // Subject is optional, always valid
            if (nameValid && emailValid && messageValid) {
                submitButton.disabled = false;
                submitButton.classList.remove('disabled');
            } else {
                submitButton.disabled = true;
                submitButton.classList.add('disabled');
            }
        }

        // Initial state
        validateForm();

        // Real-time validation
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', validateForm);
            input.addEventListener('blur', validateForm);
        });

        contactForm.addEventListener('submit', function(e) {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            if (!name || !validateEmail(email) || !message) {
                // Prevent submit, highlight fields
                validateForm();
                e.preventDefault();
                return false;
            }
            // Let the mailto logic in contact.html handle the rest
        });
    }
    
    // Handle smooth scrolling to products section from homepage navigation
    function handleProductsNavigation() {
        const hash = window.location.hash;
        
        // Check if we need to scroll to products section
        if (hash === '#our-products') {
            console.log('🎯 Navigating to Our Products section');
            setTimeout(() => {
                const productsSection = document.getElementById('our-products');
                if (productsSection) {
                    console.log('✅ Products section found, initiating scroll and highlight');
                    
                    // Calculate offset for header
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 90;
                    
                    // Scroll to the section with proper offset
                    const elementPosition = productsSection.offsetTop;
                    const offsetPosition = elementPosition - headerHeight - 30;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add visual emphasis to the products section
                    setTimeout(() => {
                        productsSection.classList.add('section-highlight');
                        console.log('🌟 Section highlight applied');
                        
                        // Remove the highlight class after animation completes
                        setTimeout(() => {
                            productsSection.classList.remove('section-highlight');
                            console.log('✨ Section highlight removed');
                        }, 2500);
                    }, 800); // Delay to allow smooth scroll to complete
                } else {
                    console.log('❌ Products section not found');
                }
            }, 100); // Small delay to ensure page is loaded
        }
    }
    
    // Call the function if we're on the about page
    if (document.querySelector('.about-page')) {
        console.log('📄 About page detected, setting up products navigation');
        handleProductsNavigation();
    }
});