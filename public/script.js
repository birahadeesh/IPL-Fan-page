// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // Initialize all animations and effects
    initPageLoader();
    initScrollProgressBar();
    initBackToTop();
    initActiveSectionIndicator();
    initSectionFadeIn();
    initScrollAnimations();
    initFloatingElements();
    initCounterAnimations();
    initNavbarEffects();
    initMobileMenu();
    initParallaxEffects();
    initFormHandling();
    initSmoothScrolling();
    initAnthemPlayer();
    initPredictionGame();
    initModalSystem();
    initTimelineAnimations();
    initLiveTicker();

    // Page Loader
    function initPageLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1000); // Allow 1s minimal load time for effect
        }
    }

    // Scroll Progress Bar
    function initScrollProgressBar() {
        const progressBar = document.getElementById('scrollProgressBar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = `${scrollPercent}%`;
            });
        }
    }

    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Active Section Indicator
    function initActiveSectionIndicator() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Offset by 150px to account for header/ticker
                if (scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Section Fade In
    function initSectionFadeIn() {
        const sections = document.querySelectorAll('section');
        
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Scroll Animation Observer
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // Floating Elements Animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');

        floatingElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 1;

            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5 * speed;
                element.style.transform = `translateY(${rate}px) rotate(${rate * 0.1}deg)`;
            });
        });
    }

    // Counter Animation for Stats
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        entry.target.textContent = Math.floor(current);
                    }, 16);

                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Navbar Effects
    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        const root = document.documentElement;
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add/remove background blur based on scroll
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                navbar.style.boxShadow = 'none';
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
                root.style.setProperty('--navbar-offset', '0px');
            } else {
                navbar.style.transform = 'translateY(0)';
                root.style.setProperty('--navbar-offset', '70px');
            }

            lastScrollTop = scrollTop;
        });

        // Initialize offset on load
        root.style.setProperty('--navbar-offset', '70px');
    }

    // Mobile Menu Toggle
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');

                // Animate hamburger lines
                const spans = hamburger.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (hamburger.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    }
                });
            });

            // Close menu when clicking on links
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                });
            });
        }
    }

    // Parallax Effects
    function initParallaxEffects() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (heroContent) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Anthem Player
    function initAnthemPlayer() {
        const anthemButton = document.getElementById('playAnthem');
        const anthemAudio = document.getElementById('anthemAudio');
        let isPlaying = false;

        if (anthemButton && anthemAudio) {
            anthemButton.addEventListener('click', () => {
                if (isPlaying) {
                    anthemAudio.pause();
                    anthemButton.innerHTML = '<i class="fas fa-music"></i> Play Anthem';
                    isPlaying = false;
                } else {
                    anthemAudio.play();
                    anthemButton.innerHTML = '<i class="fas fa-pause"></i> Pause Anthem';
                    isPlaying = true;

                    // Add visual effect
                    anthemButton.style.animation = 'pulse 0.5s ease';
                    setTimeout(() => {
                        anthemButton.style.animation = '';
                    }, 500);
                }
            });

            // Handle audio end
            anthemAudio.addEventListener('ended', () => {
                anthemButton.innerHTML = '<i class="fas fa-music"></i> Play Anthem';
                isPlaying = false;
            });
        }
    }

    // Prediction Game
    function initPredictionGame() {
        const predictionBtns = document.querySelectorAll('.prediction-btn');
        const predictionResult = document.getElementById('predictionResult');

        predictionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove selected class from all buttons
                predictionBtns.forEach(b => b.classList.remove('selected'));

                // Add selected class to clicked button
                btn.classList.add('selected');

                const selectedTeam = btn.getAttribute('data-team');

                // Simulate prediction result
                setTimeout(() => {
                    const random = Math.random();
                    let result;

                    if (selectedTeam === 'CSK') {
                        if (random > 0.3) {
                            result = `🎉 CSK wins! Your prediction was correct! Whistle Podu! 🦁`;
                            predictionResult.style.background = '#10b981';
                            predictionResult.style.color = 'white';
                        } else {
                            result = `😔 MI wins! Better luck next time!`;
                            predictionResult.style.background = '#ef4444';
                            predictionResult.style.color = 'white';
                        }
                    } else {
                        if (random > 0.7) {
                            result = `🎉 MI wins! Your prediction was correct!`;
                            predictionResult.style.background = '#10b981';
                            predictionResult.style.color = 'white';
                        } else {
                            result = `😔 CSK wins! Whistle Podu! 🦁`;
                            predictionResult.style.background = '#ef4444';
                            predictionResult.style.color = 'white';
                        }
                    }

                    predictionResult.textContent = result;
                    predictionResult.style.animation = 'fadeIn 0.5s ease';
                }, 1000);
            });
        });
    }

    // Modal System
    function initModalSystem() {
        const modal = document.getElementById('playerModal');
        const closeModal = document.querySelector('.close-modal');

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Timeline Animations
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            timelineObserver.observe(item);
        });
    }

    // === CONFIGURATION ===
    const CRICKET_API_URL = 'http://localhost:5000/live-score';

    // Live Ticker (now with real API)
    function initLiveTicker() {
        const ticker = document.querySelector('.live-ticker');
        const tickerContent = document.querySelector('.ticker-content');
        if (!tickerContent || !ticker) return;

        // Store match data for compact view
        let currentMatchData = {
            label: 'LIVE',
            match: 'No live matches right now',
            score: '',
            status: '',
            isLive: false
        };

        const SCROLL_THRESHOLD = 100;

        // Helper to update the ticker UI
        function updateTicker({ label, match, score, status, isLive = false }) {
            currentMatchData = { label, match, score, status, isLive };

            const isCompact = ticker.classList.contains('compact');

            if (isCompact) {
                // Compact view - show simplified label
                const compactLabel = isLive ? label : 'No live';
                tickerContent.innerHTML = `
                    <span class="ticker-label">${compactLabel}</span>
                    <div class="ticker-tooltip">
                        ${match}${score ? ' | ' + score : ''}${status ? ' | ' + status : ''}
                    </div>
                `;
            } else {
                // Full view - show all info
                tickerContent.innerHTML = `
                    <span class="ticker-label">${label}</span>
                    <span class="ticker-text"><b>${match}</b></span>
                    <span class="ticker-score">${score}</span>
                    <span class="ticker-status">${status}</span>
                `;
            }
        }

        // Scroll handler to toggle compact state with smooth transition
        let scrollTimeout;
        let isTransitioning = false;

        function handleScroll() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (isTransitioning) return;

                const scrollY = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollY > SCROLL_THRESHOLD) {
                    // Transform to compact
                    if (!ticker.classList.contains('compact')) {
                        isTransitioning = true;

                        // Step 1: Fade out current content
                        ticker.classList.add('transitioning');

                        // Step 2: After fade starts, change state (position starts moving)
                        setTimeout(() => {
                            ticker.classList.add('compact');

                            // Step 3: Update content mid-transition
                            setTimeout(() => {
                                updateTicker(currentMatchData);

                                // Step 4: Fade in new content and add bounce
                                setTimeout(() => {
                                    ticker.classList.remove('transitioning');
                                    ticker.classList.add('entering');

                                    // Step 5: Remove entering class after bounce
                                    setTimeout(() => {
                                        ticker.classList.remove('entering');
                                        isTransitioning = false;
                                    }, 600);
                                }, 100);
                            }, 200);
                        }, 150);
                    }
                } else {
                    // Transform back to full
                    if (ticker.classList.contains('compact')) {
                        isTransitioning = true;

                        // Step 1: Fade out compact content
                        ticker.classList.add('transitioning');

                        // Step 2: Change state (position starts moving back)
                        setTimeout(() => {
                            ticker.classList.remove('compact', 'entering');

                            // Step 3: Update content mid-transition
                            setTimeout(() => {
                                updateTicker(currentMatchData);

                                // Step 4: Fade in full content
                                setTimeout(() => {
                                    ticker.classList.remove('transitioning');
                                    isTransitioning = false;
                                }, 100);
                            }, 200);
                        }, 150);
                    }
                }
            }, 10);
        }

        // Click handler to expand compact view temporarily
        let expandTimeout;
        ticker.addEventListener('click', function (e) {
            if (ticker.classList.contains('compact') && !isTransitioning) {
                isTransitioning = true;

                // Smoothly expand
                ticker.classList.add('transitioning');
                setTimeout(() => {
                    ticker.classList.remove('compact', 'entering');
                    updateTicker(currentMatchData);
                    setTimeout(() => {
                        ticker.classList.remove('transitioning');
                        isTransitioning = false;
                    }, 50);
                }, 300);

                // Auto-collapse after 5 seconds if still scrolled down
                clearTimeout(expandTimeout);
                expandTimeout = setTimeout(() => {
                    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollY > SCROLL_THRESHOLD && !ticker.classList.contains('compact')) {
                        handleScroll();
                    }
                }, 5000);
            }
        });

        // Attach scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        // Fetch live matches from the API
        async function fetchLiveMatch() {
            try {
                const res = await fetch(CRICKET_API_URL);
                if (!res.ok) throw new Error("Backend proxy returned an error");
                
                const data = await res.json();
                if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
                    throw new Error("No live data from API - likely missing API key or no matches currently.");
                }
                
                // Prioritize finding an IPL or CSK match in the list of all global matches
                let liveMatch = data.data.find(m => {
                    const matchName = (m.name || m.teams?.join(' ') || '').toLowerCase();
                    return matchName.includes('chennai') || matchName.includes('csk') || matchName.includes('ipl');
                });

                // If no IPL match is found, fallback to the first active match
                if (!liveMatch) {
                    liveMatch = data.data[0];
                }

                const matchName = liveMatch.name || `${liveMatch.teams?.join(' vs ')}`;
                let score = '';
                if (liveMatch.score && Array.isArray(liveMatch.score) && liveMatch.score.length > 0) {
                    score = liveMatch.score.map(s => `${s.inning}: ${s.r}/${s.w} (${s.o} ov)`).join(' | ');
                }
                const status = liveMatch.status || '';
                updateTicker({
                    label: 'LIVE',
                    match: matchName,
                    score: score,
                    status: status,
                    isLive: true
                });
            } catch (err) {
                // Fallback to simulated thrilling IPL 2026 match when backend isn't available
                updateTicker({
                    label: 'LIVE',
                    match: 'CSK vs MI - IPL 2026 (Live from Wankhede) [Mocked Data]',
                    score: 'CSK 198/4 (18.2) | MI 185/7 (20.0)',
                    status: 'Ensure "node proxy.js" is running with API_KEY to see real scores!',
                    isLive: true
                });
            }
        }

        // Initial fetch
        fetchLiveMatch();
        // Refresh every 60 seconds
        setInterval(fetchLiveMatch, 60000);
    }

    // Form Handling
    function initFormHandling() {
        const contactForm = document.querySelector('.contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form data
                const formData = new FormData(contactForm);
                const name = contactForm.querySelector('input[type="text"]').value;
                const email = contactForm.querySelector('input[type="email"]').value;
                const message = contactForm.querySelector('textarea').value;

                // Simple validation
                if (!name || !email || !message) {
                    showNotification('Please fill in all fields!', 'error');
                    return;
                }

                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    showNotification('Message sent successfully! Whistle Podu! 🦁', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));

                if (target) {
                    const offsetTop = target.offsetTop - 120; // Account for fixed navbar and ticker

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // CTA Button Effects
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Add click animation
            ctaButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 150);

            // Show notification
            showNotification('Welcome to the Yellow Army! 🦁', 'success');

            // Scroll to heroes section
            const heroesSection = document.querySelector('#heroes');
            if (heroesSection) {
                heroesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Social Media Links Effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Add click animation
            link.style.transform = 'scale(0.9) translateY(-3px)';
            setTimeout(() => {
                link.style.transform = 'scale(1) translateY(-3px)';
            }, 150);

            // Show notification
            const platform = link.querySelector('i').className.includes('twitter') ? 'Twitter' :
                link.querySelector('i').className.includes('instagram') ? 'Instagram' :
                    link.querySelector('i').className.includes('facebook') ? 'Facebook' : 'YouTube';

            showNotification(`Opening ${platform}...`, 'info');
        });
    });

    // Gallery Item Effects
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            // Add click animation
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
            }, 200);
        });
    });

    // Hero Stats Animation on Load
    const heroStats = document.querySelectorAll('.hero-stats .stat-item');
    heroStats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });

    // Add CSS for mobile menu and animations
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Easter egg: Whistle sound on logo click
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                showNotification('Whistle Podu! 🦁 You found the secret!', 'success');
                clickCount = 0;

                // Add special animation to logo
                logo.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    logo.style.transform = 'scale(1) rotate(0deg)';
                }, 500);
            }
        });
    }

    // Add particle effect to hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: particle-float ${3 + Math.random() * 4}s linear infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particles
    createParticles();

    console.log('CSK Fan Page loaded successfully! Whistle Podu! 🦁');
});

// Global function for player modal
function showPlayerModal(player) {
    const modal = document.getElementById('playerModal');
    const modalBody = document.getElementById('modalBody');

    const playerData = {
        dhoni: {
            name: 'MS Dhoni',
            role: 'Captain Cool',
            image: 'ms dhoni.png',
            stats: {
                'IPL Runs': '4,978',
                'IPL Titles': '5',
                'Best Score': '84*',
                'Strike Rate': '135.2'
            },
            achievements: [
                'Led CSK to 5 IPL titles',
                'Most successful IPL captain',
                'Best finisher in cricket history',
                'ICC ODI Player of the Year 2008-09'
            ]
        },
        raina: {
            name: 'Suresh Raina',
            role: 'Mr. IPL',
            image: 'suresh raina.png',
            stats: {
                'IPL Runs': '5,528',
                'IPL Titles': '4',
                'Best Score': '100*',
                'Strike Rate': '136.8'
            },
            achievements: [
                'Most runs for CSK in IPL',
                'First Indian to score 100 in T20',
                'Most catches in IPL history',
                'Consistent performer for 14 seasons'
            ]
        },
        jadeja: {
            name: 'Ravindra Jadeja',
            role: 'Sir Jadeja',
            image: 'ravindra jadeja.png',
            stats: {
                'IPL Runs': '2,500+',
                'IPL Wickets': '139',
                'Best Bowling': '5/16',
                'Economy Rate': '7.6'
            },
            achievements: [
                'Best all-rounder in IPL',
                'Exceptional fielder',
                'Match-winning performances',
                'Most run-outs in IPL'
            ]
        }
    };

    const playerInfo = playerData[player];

    modalBody.innerHTML = `
        <div class="player-modal">
            <div class="player-header" style="display: flex; align-items: center; gap: 1.5rem;">
                <img src="${playerInfo.image}" alt="${playerInfo.name}" class="player-modal-image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #fdb913;">
                <div class="player-info">
                    <h2 style="margin-bottom: 0.2rem;">${playerInfo.name}</h2>
                    <p class="player-role" style="color: #1e3a8a; font-weight: 600;">${playerInfo.role}</p>
                </div>
            </div>
            <div class="player-stats" style="margin: 2rem 0;">
                <h3 style="margin-bottom: 1rem;">Career Stats</h3>
                <div class="stats-grid" style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
                    ${Object.entries(playerInfo.stats).map(([key, value]) => `
                        <div class="stat-item" style="background: #f8fafc; border-radius: 10px; padding: 1rem 1.5rem; min-width: 120px; text-align: center;">
                            <span class="stat-label" style="display: block; color: #1e3a8a; font-weight: 600;">${key}</span>
                            <span class="stat-value" style="font-size: 1.2rem; color: #fdb913; font-weight: bold;">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="player-achievements">
                <h3 style="margin-bottom: 1rem;">Key Achievements</h3>
                <ul style="list-style: none; padding-left: 0;">
                    ${playerInfo.achievements.map(achievement => `
                        <li style="margin-bottom: 0.5rem; font-size: 1rem;">🏆 ${achievement}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.style.display = 'block';
} 