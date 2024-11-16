import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';
import { showAlert } from './message-box.js';
import { renderPlayerPhoto } from './playerPhoto.js'


{/* <div class="div1_">
						<div class="div2_">
							<div class="div3_" id="player-image-sett">

							</div>
						</div>
					</div> 
					<div class="change_profile">
						<img src="../images/Camera.svg" alt="profile" width="70%" height="70%">
					</div>*/}

class SettingComponent
{

	content = document.createElement('span');
	// content1 = document.createElement('span');
	// content2 = document.createElement('span');

	constructor()
	{
		this.content.className = 'settings';
		this.content.innerHTML = `
			<div class="settings1 container1" id="container1">
				<div class="img_">
					
				</div>
				<div class="div-account-details">
					<div class="account-details_">
						<div id="plyername">
							<h1 class="display_username_sett" id="user-name-sett">  </h1>
						</div>
						<div id="account-details">
							<div id="print-account-details">
								<h1 > Account details</h1>
							</div>
							<div id="edit">
								<div class="edit_username">
									<h1 class="display_change_username"> change username </h1>
									<input class="input_username" id="input_username"> </input>
								</div>
								<div class="edit_username ">
									<button class="submit_btn" id="submit_change_username">submit</button>
								</div>
								<div class="logout" >
									<button class="logout_button" id="logoutButton">LOG OUT</button>
								</div>
								<div class="delete">
									<button class="logout_button" id="deleteButton">DELETE ACCOUNT</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="settings1 container2" id="container2">
				<div class="display_setting">
					<h1> SETTINGS </h1>
					<h3> Privacy </h3>
				</div>
				<div class="change_password">
					<div class="password__1 ">
						<h1> Change password </h1>
					</div>
					<div class="password__ ">
						<h1 class="h1_password"> Current password </h1>
						<input  class="input_password" id="Current_password"> </input>
					</div>
					<div class="password__">
						<h1 class="h1_password"> New password </h1>
						<input  class="input_password" id="newPassword"> </input>
					</div>
					<div class="password__">
						<h1 class="h1_password"> Confirm password </h1>
						<input  class="input_password" id="confirmNewPassword"> </input>
					</div>
					<div class="password__">
						<button class="button_change_password" id="buttonchangepassword">CHANGE PASSWORD</button>
					</div>
				</div>
				<div class="twofactory">
					<div class="dispaly_2factory1">
						<h1> Two-Factor authentication</h1>
					</div>
					<div class="dispaly_2factory_">
						<div class="display_secur">
							<h1> Secure your account </h1>
							<h3> Enable 2FA to add an extra layer of security  </h3>
						</div>
						<div id="TwoFA">

						</div>
					</div>
					
				</div>
			</div>
			`;


	}
	
	render()
	{
		
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		page.appendChild(message);
		const button = document.createElement('div');
		button.className = "dispaly_2factory2";
		button.id = "switch_button";
		button.innerHTML = `
		
		<img src="../images/icon-park-outline_switch.svg" alt="icon" width="100%" height="100%">

		`

		this.content.querySelector(".img_").appendChild(renderPlayerPhoto());

		this.content.appendChild(button);
		page.appendChild(this.content)
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
			
			// if (this.content == this.content1)
			// {
				
			const switc = this.content.querySelector("#switch_button");
			switc.addEventListener('click', event => {
			event.preventDefault();
			// console.log("ttttttttt");
				const container1 = this.content.querySelector("#container1");
				const container2 = this.content.querySelector("#container2");
				if (container1.style.display == 'none')
				{
					container2.style.display = 'none';
					container1.style.display = 'block';
				}
				else
				{
					container2.style.display = 'block';
					container1.style.display = 'none';
				}
			});
		
		let image = page.querySelector("#player-image");
		let username = page.querySelector("#user-name-sett");
		const setPlayerImage = async () => {
			try {
				console.log('befor fetch');
				const response = await fetch('http://localhost:8000/api/users/userProfile/', {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				console.log('after fetch');
				const data = await response.json();
				if (response.ok) {
					console.log('after await');
					image.src = data.avatar;
					// imageleft.src = data.avatar;
					// imageright.src = data.avatar;
					username.textContent = data.username;
					// console.log(image.src);
				}
				else {
					showAlert(data.error || 'failed to load user image');
					console.log(data.error || 'failed to load user image');
				}
			} catch (error) {
				showAlert(error || 'failed to fetch user profile ==> error: ');
				console.log('failed to fetch user profile ==> error: ',error);
			}
		};
		setPlayerImage();
		const twoFA = this.content.querySelector('#TwoFA');
		async function changebutton() {
			const response = await fetch('http://localhost:8000/api/users/isTwoFA/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			const data = await response.json();
			if (response.ok) {
				if (data.TwoFA === 'True') {
					twoFA.innerHTML = `
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
						<label class="form-check-label" for="flexSwitchCheckChecked">click to disable</label>
				  	</div>`;
				} else {
					twoFA.innerHTML = `
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
						<label class="form-check-label" for="flexSwitchCheckDefault">click to enable</label>
				  	</div>`;
				}
			} else {
				showAlert('somthing went wrong')
			}
		}
		changebutton();
			const enable2fa = this.content.querySelector("#TwoFA");
			if (enable2fa) {
				enable2fa.addEventListener('click', async function (event) {
					const response = await fetch('http://localhost:8000/api/setup_2fa/', {
						method : 'POST',
						credentials: 'include',
					});
					const data = await response.json();
					if (response.ok) {
						showAlert(data.message || 'check check');
					}
					else {
						showAlert(data.error);
					}
				});
			}
			// async function updateusername(username) {
			// 	const response = await fetch('http://localhost:8000/api/users/update/', {
			// 		method: 'PUT',
			// 		headers: {
			// 			'Content-Type': 'application/json'
			// 		},
			// 		credentials: 'include',
			// 		body: JSON.stringify({ username: username })
			// 	});
			
			// 	const data = await response.json();
			// 	if (response.ok) {
			// 		console.log('username updated:', data);
			// 	} else {
			// 		console.error('Error updating username:', data);
			// 	}
			// }
			


			this.content.querySelector('#deleteButton').addEventListener('click', function() {
				deleteUser();
			});
			function deleteUser() {
			    fetch('http://localhost:8000/api/users/delete', {
			        method: 'DELETE',  // Change to DELETE
			        credentials: 'include',
			        headers: {
			            'Content-Type': 'application/json',
			        },
			    })
			    .then(response => {
			        if (response.status === 204) {  // Change to 204
			            showAlert('User deleted successfully');
						navigate("/");
			        } else {
			            throw new Error('User deletion failed');
			        }
			    })
			    .catch(error => {
			        console.error('Error:', error);
			        alert('Error deleting user');
			    });
			}


			this.content.querySelector('#logoutButton').addEventListener('click', function() {
				logoutUser();
			});
			function logoutUser() {
				fetch('http://localhost:8000/api/users/logout/', {
					method: 'POST',
					credentials: 'include',  
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then(response => {
					console.log("then1");
					if (response.status === 205) {
						navigate("/login");
					} else {
						alert("error while logout");
					}
				})
				// .then(data => {
				// 	console.log("then2");
				// 	alert(data.message);
				// 	// Redirect to the login page or perform any other necessary actions
				// 	navigate("/login");  // Update with your login page URL
				// })
				.catch(error => {
					console.log("catsh");
					console.error('Error:', error);
					alert('Error logging out');
				});
			}
			let newcontent = this.content;
			this.content.querySelector('#buttonchangepassword').addEventListener('click', function() {
				changePassword();
			});
			function changePassword() {
				const currentPassword = newcontent.querySelector('#Current_password').value;
				const newPassword = newcontent.querySelector('#newPassword').value;
				const confirmNewPassword = newcontent.querySelector('#confirmNewPassword').value;
			
				fetch('http://localhost:8000/api/users/changePassword/', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						password: currentPassword,
						newPassword: newPassword,
						newPasswordConfirmation: confirmNewPassword
					})
				})
				.then(response => response.json())
				.then(data => {
					if (data.message) {
						showAlert(data.message)
					} else if (data.error) {
						showAlert(data.message)
					}
				})
				.catch(error => {
					console.error('Error:', error);
				});
			}
			this.content.querySelector('#submit_change_username').addEventListener('click', async function (event) {
				event.preventDefault();
				const newUsername = document.querySelector("#input_username").value;
				if (newUsername === '') {
					return;
				}
				const data = {
					newUsername: newUsername,
				}
				const response = await fetch('http://localhost:8000/api/users/updateUsername/', {
					method : 'PUT',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const Resdata = await response.json();
				if (response.ok) {
					// showAlert('username changed successfully');
					navigate('/settings');
				}
				else {
					showAlert(Resdata.message || Resdata.error);
				}
			});
			return page;
	}
}


export function renderSettings() {
	const page = new SettingComponent();
	return page.render();
}


// function to_settings2()
// {	
// 	const bodyContent = document.querySelector("setting-component");
// 	fetch('../html/settings2.html')
// 	.then(response => response.text())
// 	.then(data => {
// 		bodyContent.innerHTML = data;
// 	})
// 	.catch(error => {
// 		console.error('Error fetching the HTML file:', error);
// 	});
// }
