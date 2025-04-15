// AI Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setupNavbar();
        });

    // Setup chat form
    document.getElementById('chat-form').addEventListener('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });
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

// Send message to AI
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to chat
    addMessage('user', message);
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addMessage('ai', response);
    }, 1000);
}

// Add message to chat
function addMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `mb-3 d-flex ${sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`;
    messageDiv.innerHTML = `
        <div class="card ${sender === 'user' ? 'bg-blueviolet' : 'bg-dark'} border-blueviolet" style="max-width: 80%">
            <div class="card-body">
                <p class="card-text">${text}</p>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate AI response (mock implementation)
function generateAIResponse(message) {
    const responses = {
        'hello': 'Hello! How can I help you with your learning today?',
        'help': 'I can help explain concepts, suggest resources, or guide you through problems. What do you need help with?',
        'javascript': 'JavaScript is a programming language used for web development. Would you like to learn about variables, functions, or something else?',
        'default': "I'm an AI tutor here to help with your learning. Could you rephrase your question or ask about a specific topic?"
    };

    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
        return responses['hello'];
    } else if (message.includes('help')) {
        return responses['help'];
    } else if (message.includes('javascript')) {
        return responses['javascript'];
        
    } else {
        return responses['default'];
    }
}
