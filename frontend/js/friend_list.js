import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';

class Profile
{
	content = document.createElement('span');
	constructor()
	{
	}
	// post http://localhost:8000/api/friends/sendRequest/ to send a friend req
	// {
	// 	"reciever_id": 6
	// }
	// get http://localhost:8000/api/users/friendRequestList to get the requests list
	// returns {"friendsRequests":[5]} // 5 is the id of the sender
	// to accept the req
	// sender_id
	// addEventListeners() {
    //     // Tab switching functionality
    //     document.querySelectorAll('.tab').forEach(tab => {
    //         tab.addEventListener('click', (e) => {
    //             // Remove active class from all tabs
    //             document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    //             // Add active class to clicked tab
    //             e.target.classList.add('active');
                
    //             // Hide all sections
    //             document.querySelector('.friend-list').style.display = 'none';
    //             document.querySelector('.friend-requests').style.display = 'none';
                
    //             // Show selected section
    //             const section = e.target.dataset.section;
    //             if (section === 'friends') {
    //                 document.querySelector('.friend-list').style.display = 'flex';
    //             } else {
    //                 document.querySelector('.friend-requests').style.display = 'flex';
    //             }
    //         });
    //     });

        // Button functionality
        // document.querySelectorAll('.button').forEach(button => {
        //     button.addEventListener('click', (e) => {
        //         const action = e.target.className.split(' ')[1];
        //         const friendCard = e.target.closest('.friend-card');
                
        //         switch (action) {
        //             case 'accept':
        //                 friendCard.remove();
        //                 break;
        //             case 'decline':
        //             case 'remove':
        //                 friendCard.remove();
        //                 break;
        //         }
        //     });
        // });
    // }
	render()
	{
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		this.content.className = 'containerFL';
		this.content.innerHTML = `
		<div id="friendsList">
		<div class="tabs">
        <div class="tab active" data-section="friends">Friends List</div>
        <div class="tab" data-section="requests">Friend Requests</div>
		<input type="text" class="searchbar" placeholder="Add friend by username...">
        <button class="add-friend-button">Add Friend</button>
        
    </div>
    
    <div class="friends-section">
        <div class="friend-list">
            <div class="friend-card">
                <img class="friend-avatar" src="../images/default-avatar.png">
                <div class="friend-info">
                    <div class="friend-name">CoolGamer</div>
                    <div class="friend-status">Online</div>
                </div>
                <div class="friend-actions">
                    <button class="button chat">Chat</button>
                    <button class="button remove">Remove</button>
                </div>
            </div>
            <div class="friend-card">
                <img class="friend-avatar" src="../images/default-avatar.png">
                <div class="friend-info">
                    <div class="friend-name">ProPlayer</div>
                    <div class="friend-status">Online</div>
                </div>
                <div class="friend-actions">
                    <button class="button chat">Chat</button>
                    <button class="button remove">Remove</button>
                </div>
            </div>
            <div class="friend-card">
                <img class="friend-avatar" src="../images/default-avatar.png">
                <div class="friend-info">
                    <div class="friend-name">GameMaster</div>
                    <div class="friend-status">Offline</div>
                </div>
                <div class="friend-actions">
                    <button class="button chat">Chat</button>
                    <button class="button remove">Remove</button>
                </div>
            </div>
            <div class="friend-card">
                <img class="friend-avatar" src="../images/default-avatar.png">
                <div class="friend-info">
                    <div class="friend-name">PixelWarrior</div>
                    <div class="friend-status">Online</div>
                </div>
                <div class="friend-actions">
                    <button class="button chat">Chat</button>
                    <button class="button remove">Remove</button>
                </div>
            </div>
            <div class="friend-card">
                <img class="friend-avatar" src="../images/default-avatar.png">
                <div class="friend-info">
                    <div class="friend-name">QuestSeeker</div>
                    <div class="friend-status">Online</div>
                </div>
                <div class="friend-actions">
                    <button class="button chat">Chat</button>
                    <button class="button remove">Remove</button>
                </div>
            </div>
        </div>

        <div class="friend-requests">
            <div class="friend-card">
                <img class="friend-avatar" src="../images/default-avatar.png">
                <div class="friend-info">
                    <div class="friend-name">PlayerOne</div>
                    <div class="friend-status">Pending Request</div>
                </div>
                <div class="friend-actions">
                    <button class="button accept">Accept</button>
                    <button class="button decline">Decline</button>
                </div>
            </div>
        </div>
    </div>
    </div>
		`;
		page.appendChild(this.content);
		page.appendChild(renderRightBar());
		// Add JavaScript functionality
		// Tab switching functionality
		this.content.querySelectorAll('.tab').forEach(tab => {
			tab.addEventListener('click', (e) => {
				// Remove active class from all tabs
				this.content.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
				// Add active class to clicked tab
				e.target.classList.add('active');
				// Hide all sections
				this.content.querySelector('.friend-list').style.display = 'none';
				this.content.querySelector('.friend-requests').style.display = 'none';
				// Show selected section
				const section = e.target.dataset.section;
				if (section === 'friends') {
					this.content.querySelector('.friend-list').style.display = 'flex';
				} else {
					this.content.querySelector('.friend-requests').style.display = 'flex';
				}
			});
		});

		// Button functionality
		this.content.querySelectorAll('.button').forEach(button => {
			button.addEventListener('click', (e) => {
				const action = e.target.className.split(' ')[1];
				const friendCard = e.target.closest('.friend-card');
				switch (action) {
					case 'accept':
						friendCard.remove(); // Accept request action
						break;
					case 'decline':
					case 'remove':
						friendCard.remove(); // Remove or decline action
						break;
				}
			});
		});
		const body = document.body
		body.style.alignItems = 'center';
		return page;
	}
}

export function renderFriendList() {
	const page = new Profile();
	return page.render();
}
