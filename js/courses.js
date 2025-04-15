// Coursera API Integration
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setupNavbar();
        });

    // Fetch courses from Coursera API
    fetchCourses();
});

// Fetch courses from Coursera API
async function fetchCourses() {
    try {
        // Note: In production, this would use proper authentication
        const response = await fetch('https://api.coursera.org/api/courses.v1?fields=name,photoUrl,description,workload,partnerIds&includes=partners,v2Details');
        
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        displayCourses(data.elements);
    } catch (error) {
        console.error('Error fetching courses:', error);
        document.getElementById('courses-container').innerHTML = `
            <div class="col-12 text-center text-danger">
                <p>Failed to load courses. Please try again later.</p>
            </div>
        `;
    }
}

// Display courses in the UI
function displayCourses(courses) {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';

    if (!courses || courses.length === 0) {
        coursesContainer.innerHTML = `
            <div class="col-12 text-center">
                <p>No courses found.</p>
            </div>
        `;
        return;
    }

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'col-md-4 mb-4';
        courseCard.innerHTML = `
            <div class="card h-100 bg-dark border-blueviolet">
                <img src="${course.photoUrl || 'assets/background.jpeg'}" class="card-img-top" alt="${course.name}">
                <div class="card-body">
                    <h5 class="card-title text-blueviolet">${course.name}</h5>
                    <p class="card-text text-muted">${course.description || 'No description available'}</p>
                </div>
                <div class="card-footer bg-black">
                    <button class="btn btn-blueviolet w-100">Enroll Now</button>
                </div>
            </div>
        `;
        coursesContainer.appendChild(courseCard);
    });
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
}

// Filter courses
document.getElementById('category-filter').addEventListener('change', filterCourses);
document.getElementById('level-filter').addEventListener('change', filterCourses);
document.getElementById('search-courses').addEventListener('input', filterCourses);

function filterCourses() {
    // Will implement filtering logic after API integration is working
    console.log('Filtering courses...');
}
