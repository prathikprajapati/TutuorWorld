// Forum Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setupNavbar();
        });

    // Setup new thread form
    document.getElementById('newThreadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createNewThread();
    });

    // Load existing threads
    loadThreads();
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

// Initialize threads array
let threads = [];

// Load existing threads
function loadThreads() {
    const threadsList = document.getElementById('threads-list');
    threadsList.innerHTML = '';

    threads.forEach((thread, index) => {
        const threadItem = document.createElement('div');
        threadItem.className = 'list-group-item list-group-item-action bg-dark border-blueviolet';
        threadItem.innerHTML = `
            <div class="d-flex justify-content-between">
                <h5 class="mb-1 text-blueviolet" style="cursor:pointer" onclick="viewThread(${index})">${thread.title}</h5>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); deleteThread(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <small class="text-muted">${thread.category} - ${thread.date}</small>
            <p class="mb-1 mt-2">${thread.content}</p>
            <small class="text-muted">${thread.replies?.length || 0} replies</small>
        `;
        threadsList.appendChild(threadItem);
    });
}

// Create a new thread
function createNewThread() {
    const title = document.getElementById('threadTitle').value;
    const category = document.getElementById('threadCategory').value;
    const content = document.getElementById('threadContent').value;
    const date = new Date().toISOString().split('T')[0];

    // Add new thread to threads array
    threads.unshift({
        title,
        category,
        content,
        date
    });

    // Reset form
    document.getElementById('newThreadForm').reset();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('newThreadModal'));
    modal.hide();

    // Reload threads
    loadThreads();
}

// Delete a thread
function deleteThread(index) {
    // Store the index in a data attribute
    document.getElementById('confirmDeleteBtn').dataset.threadIndex = index;
    
    // Show the confirmation modal
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    deleteModal.show();
}

// Handle confirmed deletion
document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    const index = this.dataset.threadIndex;
    threads.splice(index, 1);
    localStorage.setItem('forumThreads', JSON.stringify(threads));
    loadThreads();
    
    // Hide the modal
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
    deleteModal.hide();
});

// View thread details
function viewThread(index) {
    // Store the selected thread data
    const threadData = {
        index,
        ...threads[index]
    };
    localStorage.setItem('currentThread', JSON.stringify(threadData));
    
    // Open in new tab
    window.open('thread-detail.html', '_blank');
}
