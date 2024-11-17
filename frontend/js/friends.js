import { navigate } from "./router.js";
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';

class Friends {
    content = document.createElement('div');
    constructor() {}

    render() {
        
        const friendsList = [
            {
                avatar: "../images/player1.png",
                username: "Mehdi",
                status: "ONLINE",
                statusClass: "online"
            },
            {
                avatar: "../images/player2.png",
                username: "Amine",
                status: "OFFLINE",
                statusClass: "offline"
            },
            {
                avatar: "../images/player3.png",
                username: "Karim",
                status: "ONLINE",
                statusClass: "online"
            }
        ];

        const page = document.createDocumentFragment();
        this.content.className = 'friend';
        this.content.innerHTML = `
            <div class="wrapper-fr">
                <div class="friend-list-container">
                    <header>
                        <h1>FRIEND LIST</h1>
                        <div class="friend-actions">
                            <button class="add-friend-btn">
                                <img src="../images/icons/friend-i.svg" alt="Add Friend" /> Add Friend
                            </button>
                            <div class="search-bar">
                                <input type="text" placeholder="Search for a friend" id="searchInput" />
                                <button id="searchBtn">
                                    <img src="../images/icons/search.svg" alt="Search" />
                                </button>
                            </div>
                        </div>
                    </header>
                    <div class="friend-list" id="friendList">
                        ${friendsList.map(friend => `
                            <div class="friend-card ${friend.statusClass}">
                                <div class="friend-info">
                                    <img class="avatar" src="${friend.avatar}" alt="Avatar" />
                                    <span class="username-search">${friend.username}</span>
                                </div>
                                <span class="status ${friend.statusClass}">${friend.status}</span>
                                <div class="friend-btn">
                                    <button><img src="../images/icons/prof.svg" alt="Profile" /></button>
                                    <button><img src="../images/icons/chats.svg" alt="Message" /></button>
                                    <button><img src="../images/icons/cross.svg" alt="Remove" /></button>
                                    <button><img src="../images/icons/1v1.svg" alt="1v1 Challenge" /></button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Add Friend Modal -->
                <div class="add-friend-modal hidden">
                    <div class="modal-content">
                        <h2>Add a Friend</h2>
                        <input type="text" id="friend-username" placeholder="Enter username" />
                        <div class="modal-buttons">
                            <button id="confirm-add-btn">Add Friend</button>
                            <button id="cancel-add-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        page.appendChild(this.content);

        
        page.insertBefore(renderLeftBar(), this.content);
        page.appendChild(renderRightBar());

        
        const addFriendBtn = this.content.querySelector('.add-friend-btn');
        const modal = this.content.querySelector('.add-friend-modal');
        const confirmAddBtn = this.content.querySelector('#confirm-add-btn');
        const cancelAddBtn = this.content.querySelector('#cancel-add-btn');
        const usernameInput = this.content.querySelector('#friend-username');
        const friendList = this.content.querySelector('.friend-list'); 
        const searchInput = this.content.querySelector('#searchInput');

        
        addFriendBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false'); 
            usernameInput.focus(); 
        });

        
        cancelAddBtn.addEventListener('click', closeModal);

        
        confirmAddBtn.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            if (username) {
                addFriendToList(username);
                closeModal();
            }
        });

        
        function closeModal() {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true'); 
            usernameInput.value = '';
            addFriendBtn.focus(); 
        }

        function addFriendToList(username) {
            const friendCard = document.createElement('div');
            friendCard.classList.add('friend-card', 'offline');

            friendCard.innerHTML = `
                <div class="friend-info">
                    <img class="avatar" src="../images/player2.png" alt="Avatar" />
                    <span class="username">${username}</span>
                </div>
                <p class="status offline">OFFLINE</p>
                <div class="friend-btn">
                    <button class="profile-btn">
                        <img src="../images/icons/prof.svg" alt="Profile" />
                    </button>
                    <button class="chat-btn">
                    <img src="../images/icons/chats.svg" alt="Message" />
                    </button>
                    <button class="remove-btn">
                        <img src="../images/icons/cross.svg" alt="Remove" />
                    </button>
                    <button class="challenge-btn">
                        <img src="../images/icons/1v1.svg" alt="1v1 Challenge" />
                    </button>
                </div>
            `;

            friendCard.querySelector('.remove-btn').addEventListener('click', () => {
                friendCard.remove(); 
            });

            friendCard.querySelector('.challenge-btn').addEventListener('click', () => {
                navigate('/online'); 
            });

            friendCard.querySelector('.chat-btn').addEventListener('click', () => {
                
            });

            friendCard.querySelector('.profile-btn').addEventListener('click', () => {
                navigate('/profile'); 
            });

            friendList.appendChild(friendCard);
        }

        
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const friendCards = friendList.querySelectorAll('.friend-card');
            friendCards.forEach(card => {
                const username = card.querySelector('.username').textContent.toLowerCase();
                if (username.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        return page;
    }
}

export function renderFriends() {
    console.log('render Friend page');
    const page = new Friends();
    return page.render();
}