class ChatBadge extends HTMLElement {
    static get observedAttributes() {
        return ['username', 'profile-pic', 'blocked'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    
        const container = document.createElement('div');
        container.classList.add('chat-badge');
    
        // Profile picture
        this.profilePic = document.createElement('img');
        this.profilePic.classList.add('profile-pic');
        this.profilePic.alt = 'Profile Picture';
    
        // Username
        this.username = document.createElement('span');
        this.username.classList.add('username');
    
        // Menu button (three dots)
        this.menuButton = document.createElement('button');
        this.menuButton.classList.add('menu-button');
        this.menuButton.textContent = '⋮'; // Three vertical dots
    
        // Pop-up menu
        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        this.menu.innerHTML = `
            <ul>
                <li>Go to profile</li>
                <li>Close chat</li>
                <li id="block-option">Block</li>
            </ul>
        `;
    
        // Append elements
        container.append(this.profilePic, this.username, this.menuButton, this.menu);
    
        const style = document.createElement('style');
        style.textContent = `
            .chat-badge {
                display: flex;
                align-items: center;
                background-color: #6C2DB9;
                color: #FFFFFF;
                // border-radius: 12px;
                padding: 8px 16px;
                font-family: Arial, sans-serif;
                position: relative;
            }
    
            .profile-pic {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 12px;
            }
    
            .username {
                font-size: 1rem;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
            }

            .menu-button {
                background: none;
                border: none;
                color: #FFFFFF;
                font-size: 1.5rem;
                cursor: pointer;
                border-radius: 50%; /* Ensure it's a perfect circle */
                width: 36px; /* Width of the circle */
                height: 36px; /* Height of the circle */
                display: flex;
                justify-content: center;
                align-items: center;
                transition: background-color 0.3s;
                padding: 0; /* Remove extra padding to keep the circle shape */
            }

            .menu-button.menu-active {
                background-color: rgba(255, 255, 255, 0.2); /* Light circle background when active */
            }
    
            .menu {
                display: none;
                position: absolute;
                top: 100%;
                right: 0;
                background-color: #2D2D2D;
                color: #FFFFFF;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                z-index: 1000;
            }
    
            .menu ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
    
            .menu li {
                padding: 8px 16px;
                cursor: pointer;
            }
    
            .menu li:hover {
                background-color: #404040;
            }
    
            .menu.show {
                display: block;
            }
        `;
  
        this.shadowRoot.append(style, container);
    
        // Event listeners
        this.menuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleMenu();
        });
    
        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
            this.hideMenu();
            }
        });
    }
  
    connectedCallback() {
        // Set attributes for profile picture and username
        this.profilePic.src = this.getAttribute('profile-pic') || '/images/default-avatar.png';
        this.username.textContent = this.getAttribute('username') || 'Anonymous';
        this.updateBlockOption(); // Update the Block/Unblock option on load
    
        // Add click event listeners for menu options
        const menuOptions = this.shadowRoot.querySelectorAll('.menu li');
    
        menuOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                const action = event.target.textContent.trim();
    
                switch (action) {
                    case 'Go to profile':
                        this.handleGoToProfile();
                        break;
                    case 'Close chat':
                        this.handleCloseChat();
                        break;
                    case 'Block':
                    case 'Unblock':
                        this.handleBlockUnblock();
                        break;
                    default:
                        console.warn(`Unknown action: ${action}`);
                }
    
                // Hide the menu after an action
                this.hideMenu();
            });
        });
    }
    
    // Define methods to handle each action
    handleGoToProfile() {
        console.log('Go to profile clicked');
        // Add custom behavior for navigating to profile
    }
    
    handleCloseChat() {
        this.dispatchEvent(new CustomEvent('close-chat', { bubbles: true, composed: true }));
    }
    
    handleBlockUnblock() {
        const isBlocked = this.getAttribute('blocked') === 'true';
        this.setAttribute('blocked', isBlocked ? 'false' : 'true');
        console.log(isBlocked ? 'User unblocked' : 'User blocked');
        this.dispatchEvent(new CustomEvent('block-unblock-user', { bubbles: true, composed: true }));   
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'profile-pic') {
            this.profilePic.src = newValue;
        } else if (name === 'username') {
            this.username.textContent = newValue;
        } else if (name === 'blocked') {
            this.updateBlockOption();
        }
    }

    toggleMenu() {
        const isMenuVisible = this.menu.classList.toggle('show');
        this.menuButton.classList.toggle('menu-active', isMenuVisible);
    }
  
    hideMenu() {
        this.menu.classList.remove('show');
        this.menuButton.classList.remove('menu-active');
    }
  
    updateBlockOption() {
        const isBlocked = this.getAttribute('blocked') === 'true';
        const blockOption = this.shadowRoot.querySelector('#block-option');
        blockOption.textContent = isBlocked ? 'Unblock' : 'Block';
    
        blockOption.onclick = () => {
            this.setAttribute('blocked', isBlocked ? 'false' : 'true');
        };
    }
}
  
customElements.define('chat-badge', ChatBadge);
  