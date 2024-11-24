class ChatFriendCard extends HTMLElement {
    static get observedAttributes() {
        return ['id', 'photo', 'username', 'status'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.classList.add('friend-card');

        // Friend photo
        this.img = document.createElement('img');
        this.img.classList.add('friend-photo');
        this.img.src = this.getAttribute('photo') || '../images/me.png';
        this.img.alt = this.getAttribute('username') || 'Friend';

        // Friend status
        this.status = document.createElement('div');
        this.status.classList.add('friend-status');
        this.updateStatus(this.getAttribute('status'));

        // Friend username
        this.username = document.createElement('div');
        this.username.classList.add('friend-username');
        this.username.textContent = this.getAttribute('username') || 'Unknown';

        // Content container for status and username
        const content = document.createElement('div');
        content.classList.add('friend-content');
        content.appendChild(this.username);
        content.appendChild(this.status);

        // Append photo and content
        wrapper.appendChild(this.img);
        wrapper.appendChild(content);

        // Card click event
        wrapper.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('friendCardClick', {
                detail: { card: this },
                bubbles: true,
                composed: true
            }));
        });

        // Styling
        const style = document.createElement('style');
        style.textContent = `
            .friend-card {
                display: flex;
                align-items: center;
                padding: 10px;
                border-radius: 15px;
                cursor: pointer;
                transition: background 0.3s;
                width: 90%;
            }

            .friend-photo {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }

            .friend-content {
                display: flex;
                flex-direction: column;
            }

            .friend-status {
                font-size: 14px;
                font-weight: bold;
                color: gray;
            }

            .friend-status.online {
                color: green;
            }

            .friend-status.offline {
                color: red;
            }

            .friend-username {
                font-size: 16px;
                font-weight: bold;
                color: #FFFFFF;
            }

            .selected {
                background-color: #bb5fc6;
            }
        `;

        this.shadowRoot.append(style, wrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'photo') {
            this.img.src = newValue || '../images/me.png';
        } else if (name === 'username') {
            if (newValue)
                this.username.textContent = newValue.charAt(0).toUpperCase() + newValue.slice(1);
            else
                this.username.textContent = 'Unknown';
        } else if (name === 'status') {
            this.updateStatus(newValue);
        }
    }

    updateStatus(status) {
        if (status === 'true') {
            this.status.textContent = 'Online';
            this.status.className = 'friend-status online';
        } else if (status === 'false') {
            this.status.textContent = 'Offline';
            this.status.className = 'friend-status offline';
        } else {
            this.status.textContent = '';
            this.status.className = 'friend-status';
        }
    }
}

customElements.define('chat-friend-card', ChatFriendCard);
