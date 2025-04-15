// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
	// Load navbar
	loadNavbar();
	
	// Initialize animations
	initAnimations();
	
	// Setup chatbot
	setupChatbot();
});

// Load navbar from component
function loadNavbar() {
	fetch('./components/navbar.html')
		.then(response => response.text())
		.then(data => {
			document.getElementById('navbar-container').innerHTML = data;
			setupNavbar();
		});
}

// Setup navbar functionality
function setupNavbar() {
	// Active page highlighting
	const navLinks = document.querySelectorAll('.nav-link');
	
	// Set active link based on current page
	const currentPath = window.location.pathname;
	navLinks.forEach(link => {
		const linkPath = link.getAttribute('href');
		if (linkPath === currentPath || 
			(currentPath.endsWith('index.html') && linkPath === '/') ||
			(currentPath.endsWith('/') && linkPath === 'index.html')) {
			link.classList.add('active');
		}
		
		link.addEventListener('click', function() {
			navLinks.forEach(l => l.classList.remove('active'));
			this.classList.add('active');
		});
	});
}

// Initialize animations
function initAnimations() {
	// Hero text animation
	const heroText = document.querySelector('.hero-text h1');
	if (heroText) {
		heroText.style.opacity = '0';
		heroText.style.animation = 'fadeInText 1.5s forwards';
	}
}

// Setup chatbot functionality
function setupChatbot() {
	// Create chatbot icon
	const chatbotIcon = document.createElement('div');
	chatbotIcon.className = 'chatbot-icon';
	chatbotIcon.innerHTML = '<i class="fas fa-robot fa-lg"></i>';
	document.body.appendChild(chatbotIcon);

	// Chatbot click handler
	chatbotIcon.addEventListener('click', function() {
		openChatbot();
	});
}

// Open chatbot modal
function openChatbot() {
	// Will implement full chatbot functionality later
	alert('Chatbot functionality will be implemented here');
}

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Setup stats animation observer
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(statsSection);
}

// Page navigation
document.querySelectorAll('.nav-link').forEach(link => {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelectorAll('.page').forEach(page => {
			page.classList.remove('active');
		});
		document.querySelector(`#${this.dataset.page}`).classList.add('active');
		
		document.querySelectorAll('.nav-link').forEach(navLink => {
			navLink.classList.remove('active');
		});
		this.classList.add('active');

		// Initialize stats animation if on home page
		if (this.dataset.page === 'home') {
			animateStats();
		}
	});
});

// Check authentication status
function checkAuth() {
	// Will implement authentication later
	return false;
}
