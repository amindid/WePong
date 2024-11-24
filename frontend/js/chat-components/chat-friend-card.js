class ChatFriendCard extends HTMLElement {
    static get observedAttributes() {
        return ['id', 'photo', 'username', 'status'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Wrapper element
        const wrapper = document.createElement('div');
        wrapper.classList.add('friend-card');

        // Friend photo
        this.img = document.createElement('img');
        this.img.classList.add('friend-photo');
        this.img.src = this.getAttribute('photo') || '../images/me.png';
        this.img.alt = this.getAttribute('username') || 'Friend';

        // Friend message count
        this.msgCount = document.createElement('div');
        this.msgCount.classList.add('friend-msg-count');
        this.msgCount.textContent = this.getAttribute('msgCount') || '10';

        // Friend status
        this.status = document.createElement('div');
        this.status.classList.add('friend-status');
        this.updateStatus(this.getAttribute('status'));

        // Friend username
        this.username = document.createElement('div');
        this.username.classList.add('friend-username');
        this.username.textContent = this.getAttribute('username') || 'Unknown';

        // Content container
        const content = document.createElement('div');
        content.classList.add('friend-content');
        content.appendChild(this.username);
        content.appendChild(this.status);

        // Append children to wrapper
        wrapper.appendChild(this.img);
        wrapper.appendChild(content);
        wrapper.appendChild(this.msgCount);

        // Add click event
        wrapper.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('friendCardClick', {
                detail: { card: this },
                bubbles: true,
                composed: true
            }));
        });

        // Define styles with palette
        const style = document.createElement('style');
        style.textContent = `
            :host{
                --classic-color: #ffffff;
                /* --neon-color: #00DCFF; */
                --neon-color: #F941FF;
                --fire-color: #FF774D;
                --water-color: #63CBFF;
                --earth-color: #43FF74;
                --primary-color: #bb07a3;
                --secondary-color: #cb0ccb;
                --tertiary-color: #B821FF;
                --background-color:linear-gradient(45deg, #511569 30%, black 90%);
                --nav-color: linear-gradient(180deg, rgba(132,0,135,1) 0%, rgba(23,0,44,1) 100%);
                --hover-bg-color: white;
                --text-color: white;
                --text-color-light: black;
                --msg-bg-color-green: #239B56;
                --online-color: #00ff00;
                --offline-color: #ff0000;
            }
        

            .friend-card {
                display: flex;
                align-items: center;
                padding: 10px;
                border-radius: 15px;
                cursor: pointer;
                transition: background 0.3s;
                width: 95%;
                background-color: var(--primary-color);
                margin: 5px;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
            }

            .friend-card:hover {
                background-color: var(--hover-bg-color);
                transition: background 0.3s;
                .friend-username {
                    color: var(--text-color-light);
                }
            }

            .friend-msg-count {
                margin-left: auto;
                font-size: 14px;
                font-weight: bold;
                color: white;
                background-color: var(--msg-bg-color-green);
                padding: 8px;
                border-radius: 50%;
                margin-right: 10px;
                width: 15px;
                height: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
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
                color: var(--online-color);
            }

            .friend-status.offline {
                color: var(--offline-color);
            }

            .friend-username {
                font-size: 16px;
                font-weight: bold;
                color: white ;
            }
        `;

        this.shadowRoot.append(style, wrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'photo') {
            this.img.src = newValue || '../images/me.png';
        } else if (name === 'username') {
            this.username.textContent = newValue ? 
                newValue.charAt(0).toUpperCase() + newValue.slice(1) : 
                'Unknown';
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
