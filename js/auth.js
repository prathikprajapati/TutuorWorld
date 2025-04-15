// User Authentication
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('./components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setupNavbar();
        });

    // Setup login form
    if (document.getElementById('loginForm')) {
        setupLoginForm();
    }

    // Setup signup form
    if (document.getElementById('signupForm')) {
        setupSignupForm();
    }
});

// Setup navbar functionality
function setupNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // In a real app, this would make an API call to your backend
        authenticateUser(email, password, rememberMe);
    });
}

// Setup signup form
function setupSignupForm() {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        // In a real app, this would make an API call to your backend
        registerUser(firstName, lastName, email, password);
    });
}

// Mock authentication function
function authenticateUser(email, password, rememberMe) {
    // This is a mock implementation - in a real app, you would call your backend API
    console.log('Attempting to authenticate:', email);
    
    // Simulate API call delay
    setTimeout(() => {
        // For demo purposes, we'll just store in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: 'Demo User'
        }));

        // Redirect to profile page
        window.location.href = 'profile.html';
    }, 1000);
}

// Mock registration function
function registerUser(firstName, lastName, email, password) {
    // This is a mock implementation - in a real app, you would call your backend API
    console.log('Registering new user:', firstName, lastName, email);
    
    // Simulate API call delay
    setTimeout(() => {
        // For demo purposes, we'll just store in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: `${firstName} ${lastName}`
        }));

        // Redirect to profile page
        window.location.href = 'profile.html';
    }, 1000);
}

// Check if user is authenticated
function checkAuth() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
