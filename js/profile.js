// Profile Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('./components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setupNavbar();
        });

    // Load profile data
    loadProfileData();
    
    // Setup logout button
    document.getElementById('logout-btn').addEventListener('click', logout);

    // Setup edit profile button
    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
        // Populate modal fields with current user data
        const currentUser = getCurrentUser();
        if (currentUser) {
            document.getElementById('editName').value = currentUser.name;
            document.getElementById('editEmail').value = currentUser.email;
        }
        editProfileModal.show();
    });

    // Setup edit profile form submission
    document.getElementById('editProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newName = document.getElementById('editName').value.trim();
        const newEmail = document.getElementById('editEmail').value.trim();

        if (!newName || !newEmail) {
            alert('Please fill in all fields');
            return;
        }

        // Update localStorage
        const currentUser = getCurrentUser();
        if (currentUser) {
            currentUser.name = newName;
            currentUser.email = newEmail;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Update profile display
            document.getElementById('profile-name').textContent = newName;
            document.getElementById('profile-email').textContent = newEmail;

            // Update navbar auth UI
            updateAuthUI();

            // Hide modal
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            editProfileModal.hide();
        }
    });
});

// Load profile data
function loadProfileData() {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Update profile info
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    
    // Set member since date
    const memberSince = document.getElementById('member-since');
    memberSince.textContent = new Date().getFullYear();

    // Load enrolled courses
    loadEnrolledCourses();
}

// Setup navbar functionality
function setupNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Show profile section if logged in
    const profileSection = document.getElementById('profile-section');
    if (profileSection && checkAuth()) {
        profileSection.classList.remove('d-none');
        document.getElementById('auth-buttons').classList.add('d-none');
    }
}

// Load enrolled courses
function loadEnrolledCourses() {
    // In a real app, this would fetch from your backend
    const courses = [
        {
            id: 1,
            name: "Introduction to JavaScript",
            progress: 75,
            image: "assets/background.jpeg"
        },
        {
            id: 2,
            name: "Advanced CSS Techniques",
            progress: 30,
            image: "assets/background.jpeg"
        },
        {
            id: 3,
            name: "React Fundamentals",
            progress: 10,
            image: "assets/background.jpeg"
        }
    ];

    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'col-md-4 mb-4';
        courseCard.innerHTML = `
            <div class="card h-100 bg-dark border-blueviolet">
                <img src="${course.image}" class="card-img-top" alt="${course.name}">
                <div class="card-body">
                    <h5 class="card-title text-blueviolet">${course.name}</h5>
                    <div class="progress mt-3 mb-2">
                        <div class="progress-bar bg-blueviolet" role="progressbar" 
                            style="width: ${course.progress}%" 
                            aria-valuenow="${course.progress}" 
                            aria-valuemin="0" 
                            aria-valuemax="100">
                        </div>
                    </div>
                    <p class="card-text text-muted">${course.progress}% complete</p>
                </div>
                <div class="card-footer bg-black">
                    <button class="btn btn-blueviolet w-100">Continue Learning</button>
                </div>
            </div>
        `;
        coursesList.appendChild(courseCard);
    });
}

// Get current user from auth.js
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Check auth from auth.js
function checkAuth() {
    return localStorage.getItem('currentUser') !== null;
}

// Logout from auth.js
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
