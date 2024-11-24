class ChatFriendList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        let originalFriends = [];
        let displayedFriends = [];

        const wrapper = document.createElement('div');
        wrapper.classList.add('friend-list-wrapper');

        const searchSection = document.createElement('chat-search-friend-input');
        searchSection.classList.add('search-section');

        const friendList = document.createElement('div');
        friendList.classList.add('friend-list');

        fetch('http://localhost:8000/api/users/friendList/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok){
                throw new Error('Error getting friend list: ' + response.statusText);
            }
            return response.json();
        }).then(data => {
            this.originalFriends = data.friends;
            this.displayedFriends = data.friends;
            updateFriendList(this.displayedFriends);
        }).catch(error => {
            console.error('Error: ', error);
        });

        const updateFriendList = (newFriends) => {
            console.log(newFriends);
            friendList.innerHTML = '';  // Clear the list
            for (const [key, value] of Object.entries(newFriends)) {
                const friendCard = document.createElement('chat-friend-card');
                friendCard.setAttribute('id', key);
                friendCard.setAttribute('photo', value[1]);
                friendCard.setAttribute('username', value[0]);
                friendCard.setAttribute('status', true);
                friendList.appendChild(friendCard);
            }
        };

        // Listen for search event and filter the friend list based on the search input
        searchSection.addEventListener('searchFriend', (event) => {
            this.displayedFriends = {};
            if (event.detail.searchValue === '') {
                updateFriendList(this.originalFriends);
                return;
            }
            const searchValue = event.detail.searchValue.toLowerCase();
            for (const [key, value] of Object.entries(this.originalFriends)) {
                if (value[0].toLowerCase().includes(searchValue)) {
                    this.displayedFriends[key] = value;
                }
            }
            updateFriendList(this.displayedFriends);
        });

        // Listen for friend card click event
        friendList.addEventListener('friendCardClick', (event) => {
            const clickedCard = event.detail.card;

            // Deselect all cards
            const allCards = this.shadowRoot.querySelectorAll('chat-friend-card');
            allCards.forEach(card => {
                card.shadowRoot.querySelector('.friend-card').classList.remove('selected');
            });
            clickedCard.shadowRoot.querySelector('.friend-card').classList.add('selected');
        });

        this.addEventListener('deselectFriend', () => {
            const allCards = this.shadowRoot.querySelectorAll('chat-friend-card');
            allCards.forEach(card => {
                card.shadowRoot.querySelector('.friend-card').classList.remove('selected');
            });
        });
        

        // Styling
        const style = document.createElement('style');
        style.textContent = `
            .friend-list-wrapper {
                display: flex;
                flex-direction: column;
                padding-top: 15px;
                width: 100%;
                height: 100%;
            }
            .friend-list {
                width: 100%;
                height: 100%;
                border-right: 1px solid #ccc;
                overflow-y: auto;
                flex-grow: 1;
                padding-bottom: 15px;
            }
        `;

        wrapper.append(searchSection, friendList);
        this.shadowRoot.append(style, wrapper);
    }
}

customElements.define('chat-friend-list', ChatFriendList);