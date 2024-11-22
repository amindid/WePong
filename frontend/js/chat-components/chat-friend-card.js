class ChatFriendCard extends HTMLElement {
    static get observedAttributes() {
        return ['id', 'photo', 'username'];
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

        // Friend username
        this.username = document.createElement('div');
        this.username.classList.add('friend-username');
        this.username.textContent = this.getAttribute('username') || 'Unknown';

        // Append photo and username
        wrapper.appendChild(this.img);
        wrapper.appendChild(this.username);

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
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }

            .friend-username {
                font-size: 16px;
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
        }
    }
}

customElements.define('chat-friend-card', ChatFriendCard);
