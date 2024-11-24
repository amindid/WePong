import { navigate } from '../router.js';
import { logedUser } from '../router.js';

class ChatApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.selectedFriend = null;
        console.log('Logged User:', logedUser);
        this.selectedFriendIsBlocked = false;
        this.isBlokcedByFriend = false;

        const wrapper = document.createElement('div');
        wrapper.classList.add('chat-app');

        // Append child components 
        const friendList = document.createElement('chat-friend-list');
        friendList.classList.add('friend-list');
        
        const chatContainer = document.createElement('div');
        chatContainer.classList.add('chat-container');

        // Append friend list and chat container to wrapper
        wrapper.appendChild(friendList);
        wrapper.appendChild(chatContainer);

        // Append styles
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .chat-app {
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 100vh;
                background-color: #510054;
            }

            .friend-list {
                width: 20%;
                background-color: #510054;
                overflow-y: auto;
            }
            .no-friend-message {
                color: white;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
            }
            .chat-container {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                background-color: #300141;
                padding: 1rem;
                overflow-y: auto;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .chat-app {
                    flex-direction: column;
                }

                .chat-container {
                    order: 2; /* Place chat-container first */
                    width: 100%;
                    height: 60%;
                }

                .friend-list {
                    order: 1; /* Place friend-list second */
                    width: 100%;
                    height: 40%;
                }
            }

            @media (max-width: 480px) {
                .chat-container {
                    height: 70%; /* Allocate more space for the chat-container on smaller devices */
                }

                .friend-list {
                    height: 30%;
                }
            }
        `;


        this.shadowRoot.append(style, wrapper);

        // Add a default message when no friend is selected
        this.chatContainer = chatContainer;
        this.showNoFriendSelectedMessage();

        friendList.addEventListener('friendCardClick', async (event) => {
            const clickedCard = event.detail.card;

            this.selectedFriend = {
                id:  parseInt(clickedCard.getAttribute('id'), 10),
                username: clickedCard.getAttribute('username'),
                photo: clickedCard.getAttribute('photo')
            };

            await this.callIsBlockedUserApi();
            await this.isBlokcedByFriendApi();
            await this.updateChatContainer(this.selectedFriend);
            await this.connectWebSocket(this.selectedFriend.id, logedUser.id);
        });

        this.chatContainer.addEventListener('close-chat', () => {
            while (this.chatContainer.firstChild)
                this.chatContainer.removeChild(this.chatContainer.firstChild);

            // Dispatch event to deselect all friend cards
            const friendList = this.shadowRoot.querySelector('chat-friend-list');
            if (friendList) {
                friendList.dispatchEvent(new CustomEvent('deselectFriend', {
                    bubbles: true,
                    composed: true
                }));
            }
            this.showNoFriendSelectedMessage();
        });

        // block-unblock-user
        this.chatContainer.addEventListener('block-unblock-user', async () => {
            if (this.selectedFriend) {
                await this.blockUnblockUser(this.selectedFriend.id);
                await this.updateChatContainer(this.selectedFriend, logedUser);
                await this.connectWebSocket(this.selectedFriend.id, logedUser.id);
            }
        });

        this.chatContainer.addEventListener('go-profile', () => {
            navigate(`/profile`, this.selectedFriend.username);
        });

        // invite-play
        this.chatContainer.addEventListener('invite-play', () => {
            console.log('Invite to play clicked');
        });
    }

    async callIsBlockedUserApi() {
        try {
            const response = await fetch('http://localhost:8000/api/friends/is_blocked/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friend_id: this.selectedFriend.id })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.error || response.statusText}`);
            }
    
            const data = await response.json();
            this.selectedFriendIsBlocked = data.is_blocked;
        } catch (error) {
            console.error('Error fetching isBlockedUser:', error.message);
        }
    }

    async isBlokcedByFriendApi() {
        console.log('isBlokcedByFriendApi');
        try {
            const response = await fetch('http://localhost:8000/api/friends/is_blocked_by/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friend_id: this.selectedFriend.id })
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.error || response.statusText}`);
            }
        
            const data = await response.json();
            this.isBlokcedByFriend = data.is_blocked;
            console.log('isBlokcedByFriend:', data.is_blocked);
        } catch (error) {
            console.error('Error fetching isBlockedUser:', error.message);
        }
    }

    async blockUnblockUser(friendId) {
        const url = this.selectedFriendIsBlocked ? 'http://localhost:8000/api/friends/unblock/'
                                                 : 'http://localhost:8000/api/friends/block/';

        const action = this.selectedFriendIsBlocked ? 'unblock' : 'block';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: friendId })
            });
    
            if (!response.ok) {
                throw new Error(`Error ${action}ing user: ${response.statusText}`);
            }
            
            this.selectedFriendIsBlocked = !this.selectedFriendIsBlocked;
        } catch (error) {
            console.error(`Error ${action}ing user:`, error);
        }
    }

    showNoFriendSelectedMessage() {
        this.chatContainer.innerHTML = '<p class="no-friend-message">Select a friend to start chatting.</p>';
    }

    // Update chat container with selected friend
    async updateChatContainer(friend) {
        // Clear the chat container by removing all previous components
        while (this.chatContainer.firstChild) {
            this.chatContainer.removeChild(this.chatContainer.firstChild);
        }
    
        // Create and append new components for the selected friend
        const header = document.createElement('chat-header');
        header.setAttribute('friend-name', friend.username);
        header.setAttribute('friend-image', friend.photo);
    
        const messageList = document.createElement('chat-message-list');
    
        const chatBadge = document.createElement('chat-badge');
        chatBadge.setAttribute('profile-pic', friend.photo);
        chatBadge.setAttribute('username', friend.username);
        chatBadge.setAttribute('blocked', this.selectedFriendIsBlocked);
    
        this.chatContainer.appendChild(chatBadge);
        // this.chatContainer.appendChild(header);
        this.chatContainer.appendChild(messageList);
        // check if the user is blocked
        if (this.selectedFriendIsBlocked) {
            const blockedMessage = document.createElement('div');
            blockedMessage.textContent = "Can't send a message to blocked contact " + friend.username + " .";

            blockedMessage.style.margin = '10px auto';
            blockedMessage.style.padding = '10px 15px';
            blockedMessage.style.color = '#FFFFFF';
            blockedMessage.style.textAlign = 'center';
            blockedMessage.style.fontSize = '16px';
            this.chatContainer.appendChild(blockedMessage);
        } 
        else if (this.isBlokcedByFriend) {
            const blockedMessage = document.createElement('div');
            blockedMessage.textContent = friend.username + " has blocked you.";
            
            blockedMessage.style.margin = '10px auto';
            blockedMessage.style.padding = '10px 15px';
            blockedMessage.style.color = '#FFFFFF';
            blockedMessage.style.textAlign = 'center';
            blockedMessage.style.fontSize = '16px';
            this.chatContainer.appendChild(blockedMessage);
        }
        else {
            const input = document.createElement('chat-input');
            input.classList.add('chat-input');
            this.chatContainer.appendChild(input);

            input.addEventListener('message-sent', (e) => {
                const userMessage = e.detail.message;
                this.sendMessage(userMessage); // Send message via WebSocket
                messageList.addMessage(userMessage, 'me');
            });
        }
        await this.fetchChatMessages(friend, messageList);
    }

    async fetchChatMessages(friend, messageList) {
        const [firstId, secondId] = [logedUser.id, friend.id].sort((a, b) => a - b);
        const roomName = `${firstId}_${secondId}`;

        // create a room between the two users if it doesn't exist
        await fetch(`http://127.0.0.1:8000/api/chat/rooms/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({        
                name: roomName,
                users: [firstId, secondId]
            })  
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error creating a room: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Room created:', data);
        })

        // fetch messages from the room
        await fetch(`http://127.0.0.1:8000/api/chat/rooms/${roomName}/messages/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error(`Error getting messageList Data: ${response.statusText}`);
            return response.json();
        })
        .then((data) => {
            data.forEach((record) => {
                let sender;
                let picture;
                if (record.user_id == logedUser.id) {
                    sender = 'me';
                    picture = logedUser.photo;
                } else if (record.user_id == friend.id) {
                    sender = 'you';
                    picture = friend.photo;
                }
                messageList.addMessage(
                    record.message,
                    sender,
                    picture, 
                    record.timestamp
                );
            });
        })
        .catch((error) => {
            console.error('Error fetching messages:', error);
        });
    }

    // WebSocket connection to server
    connectWebSocket(friendId, logedUserId) {
        const [firstId, secondId] = [logedUserId, friendId].sort((a, b) => a - b);
        const roomName = `${firstId}_${secondId}`;
        
        // Create WebSocket URL without token query parameter
        const socketUrl = `ws://localhost:8000/ws/chat/${roomName}/`;
        
        // Create WebSocket with credentials
        this.socket = new WebSocket(socketUrl);
        
        // Enable credentials
        this.socket.withCredentials = true;
        
        console.log('Connecting to WebSocket:', socketUrl);
    
        this.socket.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.user_id != logedUserId)
                this.handleIncomingMessage(data);
        });

        this.socket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }
    
    // Send message through WebSocket
    sendMessage(message) {
        console.log('Sending message:', message);
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const messageData = {
                content: message,
            };
            this.socket.send(JSON.stringify(messageData));
        }
    }

    // Handle incoming WebSocket messages
    handleIncomingMessage(messageData) {
        const messageList = this.chatContainer.querySelector('chat-message-list');
        const sender = 'you';
        messageList.addMessage(messageData.message, 
                               sender,
                               this.selectedFriend.photo, 
                               messageData.timestamp);
    }

    // Disconnect WebSocket when the component is removed
    disconnectedCallback() {
        if (this.socket) {
            this.socket.close();
            console.log('WebSocket disconnected');
        }
    }
}

customElements.define('chat-app', ChatApp);




// // Create a WebSocket connection for notifications
// const notificationSocket = new WebSocket('ws://yourserver/notifications/?userId=' + userId);

// // Listen for notifications
// notificationSocket.onmessage = function(event) {
//     const data = JSON.parse(event.data);

//     // If the notification includes the unread count and the last message timestamp
//     if (data.unread_count !== undefined && data.last_message_timestamp !== undefined) {
//         // Update the notification UI with the unread count and last message timestamp
//         document.getElementById('notification-count-' + data.sender_id).innerText = `Unread messages: ${data.unread_count}`;
//         document.getElementById('last-message-timestamp-' + data.sender_id).innerText = `Last message: ${data.last_message_timestamp}`;
//     }
// };

// // Handle WebSocket open
// notificationSocket.onopen = function(event) {
//     console.log("Notification WebSocket connected");
// };

// // Handle WebSocket close
// notificationSocket.onclose = function(event) {
//     console.log("Notification WebSocket disconnected");
// };
