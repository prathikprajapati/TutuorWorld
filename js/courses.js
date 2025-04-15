const dummyCourses = [
    {
        name: "Introduction to Python",
        description: "Learn the basics of Python programming language.",
        category: "Technology",
        level: "Beginner",
        photoUrl: "assets/python-course.jpg"
    },
    {
        name: "Business Management 101",
        description: "Fundamentals of managing a successful business.",
        category: "Business",
        level: "Intermediate",
        photoUrl: "assets/business-course.jpg"
    },
    {
        name: "Basics of Astronomy",
        description: "Explore the wonders of the universe and celestial bodies.",
        category: "Science",
        level: "Beginner",
        photoUrl: "assets/astronomy-course.jpg"
    },
    {
        name: "Digital Painting Techniques",
        description: "Learn digital art and painting using popular software.",
        category: "Arts",
        level: "Advanced",
        photoUrl: "assets/painting-course.jpg"
    },
    {
        name: "Data Structures and Algorithms",
        description: "Understand core computer science concepts for coding interviews.",
        category: "Technology",
        level: "Advanced",
        photoUrl: "assets/dsa-course.jpg"
    }
];

// Render courses on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setupNavbar();
        });

    renderCourses(dummyCourses);

    // Setup filter event listeners
    document.getElementById('category-filter').addEventListener('change', filterCourses);
    document.getElementById('level-filter').addEventListener('change', filterCourses);
    document.getElementById('search-courses').addEventListener('input', filterCourses);
});

function renderCourses(courses) {
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

function filterCourses() {
    const categoryFilter = document.getElementById('category-filter').value;
    const levelFilter = document.getElementById('level-filter').value;
    const searchQuery = document.getElementById('search-courses').value.toLowerCase();

    const filteredCourses = dummyCourses.filter(course => {
        const matchesCategory = categoryFilter === 'All Categories' || course.category === categoryFilter;
        const matchesLevel = levelFilter === 'All Levels' || course.level === levelFilter;
        const matchesSearch = course.name.toLowerCase().includes(searchQuery) || course.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesLevel && matchesSearch;
    });

    renderCourses(filteredCourses);
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
