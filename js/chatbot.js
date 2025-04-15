document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendButton = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');

    // Toggle chatbot visibility
    chatbotIcon.addEventListener('click', function() {
        chatbotContainer.classList.toggle('show-chatbot');
    });

    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('show-chatbot');
    });

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user-message');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot-message');
            }, 500);
        }
    }

    // Handle Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Handle send button click
    sendButton.addEventListener('click', sendMessage);

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Simple bot responses
    function getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            return "Hello! How can I help you today?";
        } else if (lowerMsg.includes('help')) {
            return "I can help with forum questions, course information, and general guidance. What do you need?";
        } else if (lowerMsg.includes('forum') || lowerMsg.includes('discussion')) {
            return "You can browse and participate in discussions in the forum section. Would you like me to take you there?";
        } else {
            return "I'm still learning! For more complex questions, please check our FAQ or contact support.";
        }
    }
});
