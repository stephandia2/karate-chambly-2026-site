/* ==========================================================================
   KARATÉ CHAMBLY 2026 - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ==========================================================================
       ANIMATIONS ON SCROLL
       ========================================================================== */
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    /* ==========================================================================
       HEADER SCROLL EFFECT
       ========================================================================== */
    
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    /* ==========================================================================
       MOBILE NAVIGATION
       ========================================================================== */
    
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    /* ==========================================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================================================== */
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    /* ==========================================================================
       COUNTDOWN TIMER
       ========================================================================== */
    
    const countdownElements = {
        days: document.getElementById('countdown-days'),
        hours: document.getElementById('countdown-hours'),
        minutes: document.getElementById('countdown-minutes'),
        seconds: document.getElementById('countdown-seconds')
    };
    
    if (countdownElements.days) {
        const eventDate = new Date('April 4, 2026 09:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                if (countdownElements.days) countdownElements.days.textContent = days.toString().padStart(2, '0');
                if (countdownElements.hours) countdownElements.hours.textContent = hours.toString().padStart(2, '0');
                if (countdownElements.minutes) countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
                if (countdownElements.seconds) countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    /* ==========================================================================
       GALLERY LIGHTBOX
       ========================================================================== */
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.innerHTML = `
                <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 9999; cursor: pointer;">
                    <img src="${imgSrc}" style="max-width: 90%; max-height: 90%; border-radius: 10px;">
                </div>
            `;
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
    
    /* ==========================================================================
       FORM VALIDATION
       ========================================================================== */
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#E30613';
                } else {
                    field.style.borderColor = '#E5E5E5';
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                                background: white; padding: 40px; border-radius: 15px; 
                                text-align: center; z-index: 10000; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style="margin: 20px 0 10px; color: #1A1A1A;">Merci !</h3>
                        <p style="color: #666;">Votre message a été envoyé avec succès.</p>
                    </div>
                `;
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                    form.reset();
                }, 3000);
            }
        });
    });
    
    /* ==========================================================================
       ACTIVE NAV LINK ON SCROLL
       ========================================================================== */
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    /* ==========================================================================
       LOADER
       ========================================================================== */
    
    const loader = document.querySelector('.loader');
    
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        });
    }
    
    /* ==========================================================================
       COUNTER ANIMATION
       ========================================================================== */
    
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    console.log('🏆 KARATÉ CHAMBLY 2026 - Website initialized');
});
