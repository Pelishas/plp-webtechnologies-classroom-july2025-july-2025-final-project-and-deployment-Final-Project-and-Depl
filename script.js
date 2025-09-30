// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill')) {
                    entry.target.style.animation = 'bounceIn 0.6s ease-out';
                }
                if (entry.target.classList.contains('interest')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }
                if (entry.target.classList.contains('project')) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.skill, .interest, .project, .education, #contact');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing animation for hero title (only on home page)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && currentPage === 'index.html') {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Form submission animation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('input[type="submit"]');
            submitBtn.style.transform = 'scale(0.95)';
            submitBtn.value = 'Sending...';
            
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
                submitBtn.value = 'Message Sent!';
                submitBtn.style.background = '#4CAF50';
            }, 1000);
        });
    }

    // Hover effects for project cards
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skills animation on scroll
    const skillsSection = document.querySelector('.skills');
    const skillElements = document.querySelectorAll('.skill');
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillElements.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.style.animation = `bounceIn 0.6s ease-out`;
                        skill.style.animationDelay = `${index * 0.1}s`;
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Interests animation on scroll
    const interestsSection = document.querySelector('.interests');
    const interestElements = document.querySelectorAll('.interest');
    
    const interestsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                interestElements.forEach((interest, index) => {
                    setTimeout(() => {
                        interest.style.animation = `fadeInUp 0.6s ease-out`;
                        interest.style.animationDelay = `${index * 0.1}s`;
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (interestsSection) {
        interestsObserver.observe(interestsSection);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scroll-based animations here if needed
        if (scrollTop > lastScrollTop) {
            // Scrolling down
        } else {
            // Scrolling up
        }
        lastScrollTop = scrollTop;
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .cv-download, input[type="submit"], .project-links a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cta-button, .cv-download, input[type="submit"], .project-links a {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});