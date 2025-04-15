document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        });

    // Load thread data
    const threadData = JSON.parse(localStorage.getItem('currentThread'));
    if (!threadData) {
        window.location.href = 'forum.html';
        return;
    }

    // Display thread content
    const threadContent = document.getElementById('thread-content');
    threadContent.innerHTML = `
        <div class="card-body">
            <h2 class="text-blueviolet">${threadData.title}</h2>
            <small class="text-muted">${threadData.category} - ${threadData.date}</small>
            <p class="my-3">${threadData.content}</p>
        </div>
    `;

    // Display replies
    const repliesList = document.getElementById('replies-list');
    if (threadData.replies && threadData.replies.length > 0) {
        threadData.replies.forEach(reply => {
            const replyItem = document.createElement('div');
            replyItem.className = 'card bg-dark border-blueviolet mb-3';
            replyItem.innerHTML = `
                <div class="card-body">
                    <p>${reply.content}</p>
                    <small class="text-muted">${reply.date}</small>
                </div>
            `;
            repliesList.appendChild(replyItem);
        });
    } else {
        repliesList.innerHTML = '<p class="text-muted">No replies yet. Be the first to reply!</p>';
    }

    // Handle reply form submission
    document.getElementById('replyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('replyUsername').value;
        const content = document.getElementById('replyContent').value;
        const date = new Date().toISOString().split('T')[0];
        
        // Add reply to thread
        if (!threadData.replies) threadData.replies = [];
        threadData.replies.push({ 
            username,
            content, 
            date 
        });
        
        // Update thread in forum.js storage
        const forumThreads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
        forumThreads[threadData.index] = threadData;
        localStorage.setItem('forumThreads', JSON.stringify(forumThreads));
        localStorage.setItem('currentThread', JSON.stringify(threadData));
        
        // Reset form and reload replies
        document.getElementById('replyForm').reset();
        location.reload();
    });
});
