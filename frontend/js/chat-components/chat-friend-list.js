class ChatFriendList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.classList.add('friend-list-wrapper');

        // Create the search section
        const searchSection = document.createElement('chat-search-friend-input');
        searchSection.classList.add('search-section');

        // Create the friend list section
        const friendList = document.createElement('div');
        friendList.classList.add('friend-list');

        // Example friends - original full list
        this.originalFriends = [
            { id: '1', photo: '', username: 'alicej' },
            { id: '2', photo: '', username: 'bobsmith' },
            { id: '3', photo: '', username: 'charlieb' },
            { id: '4', photo: '', username: 'davew' },
        ];

        // instead of this dummy data, we can fetch the friends from the backend
        // fetch('http://localhost:8080/users/friendList/')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         this.originalFriends = data;
        //         this.displayedFriends = [...this.originalFriends];
        //         updateFriendList(this.displayedFriends);
        //     });

        // Displayed friends list, initially all friends
        this.displayedFriends = [...this.originalFriends];

        const updateFriendList = (newFriends) => {
            friendList.innerHTML = '';  // Clear the list
            newFriends.forEach(friend => {
                const friendCard = document.createElement('chat-friend-card');
                friendCard.setAttribute('id', friend.id || '');
                friendCard.setAttribute('photo', friend.photo || '../images/you.png');
                friendCard.setAttribute('username', friend.username || 'Unknown');
                friendList.appendChild(friendCard);
            });
        };

        // Initial friend list population
        updateFriendList(this.displayedFriends);

        // Listen for search event and filter the friend list based on the search input
        searchSection.addEventListener('searchFriend', (event) => {
            if (event.detail.searchValue === '') {
                updateFriendList(this.originalFriends);
                return;
            }
            const searchValue = event.detail.searchValue.toLowerCase();
            this.displayedFriends = this.originalFriends.filter(friend =>
                friend.username.toLowerCase().includes(searchValue)
            );
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

            // Select the clicked card
            clickedCard.shadowRoot.querySelector('.friend-card').classList.add('selected');

            const username = clickedCard.getAttribute('username');
            // console.log(`Selected friend: ${username}`);
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
