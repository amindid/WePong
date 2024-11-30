import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';
import { cleanupUserSockets } from './router.js';
import { sendEmailConfirmation, showAlert } from './message-box.js';
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
		this.content.innerHTML = /*html*/`
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
									<h1 class="display_change_username"> - change username -  </h1>
									<input class="input_username" id="input_username"> </input>
								</div>
								<div class="edit_username ">
									<button class="submit_btn" id="submit_change_username">submit</button>
								</div>
								<div class="edit_username">
									<h1 class="display_change_username"> - change picture -  </h1>
									<input type="file" id="input_picture" accept="image/*">
								</div>
								<div class="edit_username ">
									<button class="submit_btn" id="submit_change_picture">submit</button>
								</div>
								</div>
								</div>
								</div>
								<div id="settings-btns">
									<div class="logout" >
										<button class="logout_button" id="logoutButton">LOG OUT</button>
									</div>
									<div class="delete">
										<button class="logout_button" id="deleteButton">DELETE ACCOUNT</button>
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
						<div class="display_secur" id="TwoFA">

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
		const button = document.createElement('div');
		button.className = "dispaly_2factory2";

		button.innerHTML = `
		<button id="switch_button_id" class="switch_button">
			<img src="../images/icon-park-outline_switch.svg" alt="icon" width="100" height="100%"></img>	
		</button>
		

		`

		this.content.querySelector(".img_").appendChild(renderPlayerPhoto());

		this.content.appendChild(button);
		page.appendChild(this.content)
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
			
			// if (this.content == this.content1)
			// {
				
			const switc = this.content.querySelector("#switch_button_id");
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
				let button_twofa = document.createElement("div");
				button_twofa.className = "form-check form-switch";
				if (data.TwoFA === 'True') {
					button_twofa.innerHTML	 = `
						<input class="form-check-input display_secur_label"  type="checkbox" id="flexS" checked>
						<label class="form-check-label display_secur_label" for="flexSwitchCheckChecked">click to disable</label>
						`;
				} else {
					button_twofa.innerHTML = `
						<input class="form-check-input display_secur_label" type="checkbox" id="flexS">
						<label class="form-check-label display_secur_label" for="flexSwitchCheckDefault">click to enable</label>
				  		`;
				}
				const enable2fa = button_twofa.querySelector("#flexS");
				if (enable2fa) {
				enable2fa.addEventListener('click', async function (event) {
					const res = await fetch ('http://localhost:8000/api/users/is_email_confirmed/', {
						method : 'GET',
						credentials : 'include',
					});
					const resData = await res.json();
					if (resData.confirmed){
						console.log('inside condition');
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
					}
					else {
						
						sendEmailConfirmation('Send Email to confirm');
					    const sendEmailBtn = document.getElementById('send-email-btn');
    					if (sendEmailBtn) {
    					    console.log('inside sendEmailBtn');
    					    sendEmailBtn.addEventListener('click' , async function (event) {
    					        const response = await fetch ('http://localhost:8000/api/users/confirmEmail/', {
    					            method : 'GET',
    					            credentials : 'include',
    					        });
    					        const data = response.json();
    					        if (!data.ok) {
    					            showAlert(data.error || 'cant send email to your inbox');
    					        }
								const sendMainElement = document.querySelector(".send-email");
								if (sendMainElement){
									sendMainElement.parentNode.removeChild(sendMainElement);								}
    					    });
    					}
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


					}
				});
			}
				twoFA.appendChild(button_twofa);
			} else {
				showAlert('somthing went wrong')
			}
		}
		changebutton();
			// const enable2fa = twoFA.querySelector("#flexS");
			// if (enable2fa) {
			// 	enable2fa.addEventListener('click', async function (event) {
			// 		const response = await fetch('http://localhost:8000/api/setup_2fa/', {
			// 			method : 'POST',
			// 			credentials: 'include',
			// 		});
			// 		const data = await response.json();
			// 		if (response.ok) {
			// 			showAlert(data.message || 'check check');
			// 		}
			// 		else {
			// 			showAlert(data.error);
			// 		}
			// 	});
			// }
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
			


			this.content.querySelector('#deleteButton').addEventListener('click', function () {
				confirmAction('Are you sure you want to delete your account?', deleteUser);
			});
			
			this.content.querySelector('#logoutButton').addEventListener('click', function () {
				confirmAction('Are you sure you want to log out?', logoutUser);
			});
			
			function confirmAction(message, callback) {
				const isConfirmed = confirm(message);
				if (isConfirmed) {
					callback(); 
				}
			}
			
			function deleteUser() {
				fetch('http://localhost:8000/api/users/delete', {
					method: 'DELETE',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then(response => {
						if (response.status === 204) {
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
			
			function logoutUser() {
				fetch('http://localhost:8000/api/users/logout/', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then(response => {
						if (response.ok) {
							navigate("/login");
							cleanupUserSockets();
						} else {
							alert("Error while logging out");
						}
					})
					.catch(error => {
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
			this.content.querySelector('#submit_change_picture').addEventListener('click', async function (event) {
				event.preventDefault();
				const input = document.querySelector("#input_picture");
				const file = input.files[0];
				if (!file) {
					showAlert('Please select a file');
					return;
				}
				const formData = new FormData();
				formData.append('avatar', file);
				const response = await fetch('http://localhost:8000/api/users/UploadAvarar/', {
					method : 'PUT',
					credentials: 'include',
					body: formData,
				});
				const data = await response.json();
				if (response.ok) {
					showAlert('avatar changed successfully');
					navigate('/settings');
				}
				else {
					showAlert(data.message || data.error);
				}
			}
			);
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
