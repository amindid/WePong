class Toper {
	constructor() {}
	render() {
		const content = document.createDocumentFragment();
		const toper = document.createElement('div');
		toper.className = 'secondere';
		toper.innerHTML = `
			<div class="div3" id='div33'>
				<button type="button" class='searchButton' id='searchButton'>
					<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<mask id="mask0_2056_1608" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
					<rect width="24" height="24" fill="#D9D9D9"/>
					</mask>
					<g mask="url(#mask0_2056_1608)">
					<path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#7B9999"/>
					</g>
					</svg>
				</button>
    			<input type="text" placeholder="Search" class='searchInput' id='searchInput' required>
				<div id='searchResult' class='searchResult'>
					<img id='searchImage'>
					<span class='searchUsername' id='searchUsername'>no result</span>
				</div>
			</div>
			<div class="div4">
				<div class="wallet">
					1337
					<svg class="diyamonda" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14.897 0.670763L14.7476 0.5H14.5207H10.2318H5.94179H5.71489L5.56549 0.670763L1.6237 5.17604L1.34873 5.49031L1.60897 5.81688L9.84075 16.1467L10.2318 16.6374L10.6228 16.1466L18.8535 5.81686L19.1137 5.49029L18.8388 5.17604L14.897 0.670763Z" fill="#ED6FF7" stroke="white"/>
						<path d="M14.5207 1H10.2318H5.94179L2 5.50528L10.2318 15.835L18.4625 5.50528L14.5207 1Z" fill="#ED6FF7"/>
						<path d="M10.2314 5.38794H6.11548L10.2314 15.8351L14.3462 5.38794H10.2314Z" fill="#E249F2"/>
						<path d="M10.2314 1L6.11548 5.38786H14.3462L10.2314 1Z" fill="#FA6AFF"/>
						<path d="M2 5.50528H6.11589L10.2318 1H5.94179L2 5.50528Z" fill="#E249F2"/>
						<path d="M14.8948 5.38786H19.0107L15.0689 1H10.78L14.8948 5.38786Z" fill="#F989FF"/>
					</svg>
				</div>
				<svg class="notification" id="notification_id" width="40%" height="80%" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="50" height="50" rx="25" fill="#840087"/>
					<path d="M18 34C17.45 34 16.9793 33.8043 16.588 33.413C16.1967 33.0217 16.0007 32.5507 16 32V18C16 17.45 16.196 16.9793 16.588 16.588C16.98 16.1967 17.4507 16.0007 18 16H32C32.55 16 33.021 16.196 33.413 16.588C33.805 16.98 34.0007 17.4507 34 18V32C34 32.55 33.8043 33.021 33.413 33.413C33.0217 33.805 32.5507 34.0007 32 34H18ZM25 29C25.6333 29 26.2083 28.8167 26.725 28.45C27.2417 28.0833 27.6 27.6 27.8 27H32V18H18V27H22.2C22.4 27.6 22.7583 28.0833 23.275 28.45C23.7917 28.8167 24.3667 29 25 29Z" fill="#F8F8F8"/>
					<path d="M53 39C53 43.4183 49.4183 47 45 47C40.5817 47 37 43.4183 37 39C37 34.5817 40.5817 31 45 31C49.4183 31 53 34.5817 53 39Z" fill="#FF008A"/>
					<path d="M43.3711 40.3945L44.4453 40.4141C44.4688 40.4323 44.4935 40.4883 44.5195 40.582C44.6055 40.7227 44.7044 40.8099 44.8164 40.8438C45.1393 40.8438 45.3008 40.5898 45.3008 40.082C45.3008 39.7799 45.2617 39.5703 45.1836 39.4531C45.1081 39.3359 44.9805 39.2773 44.8008 39.2773C44.6211 39.2773 44.5091 39.3724 44.4648 39.5625V39.5664C44.4596 39.5846 44.4557 39.6094 44.4531 39.6406C44.4505 39.6693 44.4466 39.6953 44.4414 39.7188C44.4362 39.7422 44.4102 39.7565 44.3633 39.7617C44.1784 39.7539 43.9089 39.75 43.5547 39.75H42.6562C42.5599 39.75 42.5117 39.6237 42.5117 39.3711V39.207L42.5156 39.1523L42.5039 38.293C42.4987 37.944 42.4961 37.6862 42.4961 37.5195V36.7695C42.4961 36.6289 42.4987 36.5208 42.5039 36.4453V36.3047C42.5039 36.1615 42.5273 36.0547 42.5742 35.9844C42.7018 35.9896 42.8789 35.9922 43.1055 35.9922L46.9492 36.0273L47.0078 36.0234C47.1042 36.0234 47.1628 36.0417 47.1836 36.0781V37.0859C47.1836 37.2318 47.1784 37.3307 47.168 37.3828C47.1602 37.4323 47.1328 37.457 47.0859 37.457H47.0117C46.0508 37.457 45.1953 37.4622 44.4453 37.4727C44.4245 37.556 44.4141 37.6458 44.4141 37.7422C44.4141 37.8385 44.4128 37.8984 44.4102 37.9219L44.3828 38.2969C44.3828 38.3073 44.3815 38.3346 44.3789 38.3789C44.3789 38.4206 44.3789 38.4453 44.3789 38.4531C44.7695 38.1953 45.1797 38.0664 45.6094 38.0664C46.1849 38.0664 46.6458 38.2422 46.9922 38.5938C47.3411 38.9453 47.5156 39.3971 47.5156 39.9492C47.5156 40.2799 47.4635 40.5781 47.3594 40.8438C47.1719 41.3203 46.8333 41.6797 46.3438 41.9219C45.9193 42.1302 45.4089 42.2344 44.8125 42.2344C44.2188 42.2344 43.6966 42.1224 43.2461 41.8984C42.9805 41.7682 42.7669 41.6003 42.6055 41.3945C42.4648 41.181 42.362 40.8672 42.2969 40.4531C42.3151 40.4115 42.4258 40.3906 42.6289 40.3906L42.7188 40.3945H43.3711ZM44.4688 39.5586L44.5352 39.5938L44.4648 39.5664C44.4648 39.5638 44.4648 39.5625 44.4648 39.5625C44.4674 39.5625 44.4688 39.5612 44.4688 39.5586Z" fill="white"/>
				</svg>
			</div>
			<div class="notification-div">This is a notification.
			</div>
			`;
			content.appendChild(toper);
			const div3 = content.querySelector('#div33');
			const searchButton = content.querySelector("#searchButton");
			const searchResult = content.querySelector('#searchResult');
			div3.addEventListener('mouseover', (event) => {
				searchResult.classList.add('show');
			});
			div3.addEventListener('mouseout', (event) => {
				searchResult.classList.remove('show');
			});
			searchButton.addEventListener('click', async function (event) {
				// if (!searchButton.contains(event.target)) {
				// 	console.log('inside condition');
				// 	searchResult.classList.remove('show')
				// }
				// searchResult.addEventListener('focusout', (event) => {
				// 	// if(!searchResult.contains(event.target))
				// 	console.log('55555555555555555555555555');
				// 		searchResult.classList.remove('show');
				// });
				const searchTerm = document.querySelector("#searchInput").value;
				const data = {
					username: searchTerm,  
				};
				try {
					const response = await fetch ('http://localhost:8000/api/users/ProfileByUsername/', {
						method: 'POST',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					});
					const searchImage = document.querySelector('#searchImage');
					const searchUsername = document.querySelector('#searchUsername');
					if (response.ok) {
						const userdata = await response.json();
						if (userdata.avatar && userdata.username) {
							searchImage.src = userdata.avatar;
							searchImage.classList.add('show');
							console.log(searchImage.src);
							searchUsername.textContent = userdata.username;
						} else {
							searchImage.classList.remove('show');
							searchUsername.textContent = 'no result'
						}

						// searchResult.classList.add('show');
						// alert(`Searching for: ${userdata.username} ${userdata.email}`);
					} else {
						alert(`no result`);
					}

				} catch (error) {
					console.log('SOMTHING WENT WRONG', error);
				}
			});
			const notificationDiv = content.querySelector('.notification-div');
			function toggleNotification(event) {
				event.stopPropagation(); 
				notificationDiv.style.display = "flex";
				// notificationDiv.style.display = notificationDiv.style.display === 'block' ? 'none' : 'block';
			  }

			var notification = content.querySelector("#notification_id");
			notification.addEventListener('click', toggleNotification);
			function hideNotification() {
				notificationDiv.style.display = 'none';
			  }
			
			document.addEventListener('click', hideNotification);
			
			notificationDiv.addEventListener('click', function(event) {
				event.stopPropagation();
			  });
			return content;
	}
}
export function renderToper() {
	const toper = new Toper();
	return toper.render();
}