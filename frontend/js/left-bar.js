import { navigate } from './router.js';

class LeftBare
{
	constructor() {}

	render() {
		const content = document.createDocumentFragment();
		const bar = document.createElement('span');
		bar.className = 'left-bar';
		bar.innerHTML = `<div class="right-bar-logo">
		<svg width="100%" height="100%" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M40.1061 8.2971C30.5754 -1.35189 14.5533 -3.1101 5.74066 5.81194C-3.07195 14.734 -1.33531 30.9551 8.19533 40.6041C14.3654 46.8508 21.7085 48.2032 28.5173 45.9801L28.4881 46.0013L28.7135 45.9125C29.1727 45.7561 29.632 45.5955 30.0828 45.4096C31.2934 44.9954 33.0927 44.429 35.1884 43.9937C38.3986 43.3259 41.3334 46.817 43.7881 49.3021C46.2427 51.7873 51.1521 59.2427 52.3794 60.4853C53.6067 61.7279 54.8341 60.4853 56.0614 59.2427L57.2888 58.0002L58.5161 56.7618C59.7434 55.515 60.9708 54.2724 59.7434 53.0299C58.5161 51.7873 51.1521 46.8212 48.6974 44.336C46.2427 41.8509 42.7987 38.8755 43.4541 35.6253C43.7964 33.9305 44.2222 32.4386 44.5896 31.2679C48.0128 23.8504 47.2572 15.537 40.1061 8.2971Z" fill="white"/>
			<path d="M27.0145 46.4028C27.5197 46.2802 28.0206 46.1408 28.5174 45.9801L28.4882 46.0013L28.7136 45.9125C29.1728 45.7561 29.632 45.5955 30.0829 45.4096C31.2935 44.9954 33.0928 44.429 35.1884 43.9937C38.3987 43.3259 41.3334 46.817 43.7881 49.3021C46.2428 51.7873 51.1521 59.2427 52.3795 60.4853C53.6068 61.7279 54.8341 60.4853 56.0615 59.2427L57.2888 58.0002L58.5161 56.7618C59.7435 55.515 60.9708 54.2724 59.7435 53.0299C58.5161 51.7873 51.1521 46.8212 48.6975 44.3361C46.2428 41.8509 42.7987 38.8755 43.4541 35.6253C43.7965 33.9305 44.2223 32.4386 44.5896 31.2679C45.2075 29.9239 45.6876 28.5545 46.0174 27.1682L27.0145 46.4028Z" fill="white"/>
			<path d="M35.1967 38.1189L37.6514 35.6379L58.5161 56.7617L56.0614 59.2427L35.1967 38.1189Z" fill="white"/>
			<mask id="mask0_401_3914" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="47" y="2" width="14" height="14">
			<path d="M47.6078 2.84497H61V15.8286H47.6078V2.84497Z" fill="white"/>
			</mask>
			<g mask="url(#mask0_401_3914)">
			<path d="M60.7495 9.22688C60.7495 9.63262 60.7119 10.0299 60.6326 10.4272C60.5575 10.8245 60.4406 11.2091 60.2903 11.581C60.1358 11.9529 59.948 12.308 59.7267 12.6461C59.5055 12.98 59.255 13.2927 58.9711 13.5759C58.6914 13.8633 58.3825 14.1169 58.0527 14.3409C57.7187 14.5649 57.3681 14.7551 57.0007 14.9115C56.6333 15.0636 56.2534 15.1819 55.861 15.2622C55.4686 15.3383 55.0762 15.3806 54.6754 15.3806C54.2789 15.3806 53.8823 15.3383 53.4898 15.2622C53.1016 15.1819 52.7217 15.0636 52.3502 14.9115C51.9828 14.7551 51.6321 14.5649 51.3024 14.3409C50.9684 14.1169 50.6636 13.8633 50.3798 13.5759C50.1001 13.2927 49.8454 12.98 49.6242 12.6461C49.4029 12.308 49.215 11.9529 49.0648 11.581C48.9103 11.2091 48.7976 10.8245 48.7183 10.4272C48.639 10.0299 48.6014 9.63262 48.6014 9.22688C48.6014 8.82537 48.639 8.42385 48.7183 8.02657C48.7976 7.63351 48.9103 7.2489 49.0648 6.87275C49.215 6.50082 49.4029 6.1458 49.6242 5.81191C49.8454 5.47379 50.1001 5.16526 50.3798 4.87786C50.6636 4.59469 50.9684 4.33687 51.3024 4.11287C51.6321 3.88887 51.9828 3.69868 52.3502 3.54653C52.7217 3.39015 53.1016 3.27604 53.4898 3.19573C53.8823 3.11543 54.2789 3.07739 54.6754 3.07739C55.0762 3.07739 55.4686 3.11543 55.861 3.19573C56.2534 3.27604 56.6333 3.39015 57.0007 3.54653C57.3681 3.69868 57.7187 3.88887 58.0527 4.11287C58.3825 4.33687 58.6914 4.59469 58.9711 4.87786C59.255 5.16526 59.5055 5.47379 59.7267 5.81191C59.948 6.1458 60.1358 6.50082 60.2903 6.87275C60.4406 7.2489 60.5575 7.63351 60.6326 8.02657C60.7119 8.42385 60.7495 8.82537 60.7495 9.22688Z" fill="white"/>
			</g>
		</svg>
	</div>
	<div class="icons">
		<svg class="button-test" id="dashbord_id" width="90%" height="90%" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.285706" width="61.4286" height="61.4865" rx="10" fill="#A700B6"/>
			<path d="M43.2857 40.5811V30.9572C43.2858 30.2877 43.1493 29.6251 42.8846 29.0102C42.6199 28.3953 42.2326 27.841 41.7463 27.3812L32.6881 18.8124C32.2319 18.3807 31.6278 18.1401 31 18.1401C30.3722 18.1401 29.7682 18.3807 29.312 18.8124L20.2537 27.3812C19.7675 27.841 19.3801 28.3953 19.1154 29.0102C18.8507 29.6251 18.7142 30.2877 18.7143 30.9572V40.5811C18.7143 41.2334 18.9732 41.859 19.434 42.3202C19.8948 42.7814 20.5198 43.0405 21.1714 43.0405H40.8286C41.4803 43.0405 42.1052 42.7814 42.566 42.3202C43.0268 41.859 43.2857 41.2334 43.2857 40.5811Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		<svg class="button-test" id="friendList_id" width="90%" height="90%" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.285706" y="0.378418" width="61.4286" height="61.4865" rx="10" fill="#A700B6"/>
			<path d="M18.7714 28.3548C18.7714 30.1277 19.5796 31.7189 20.8399 32.7811C18.5162 34.0863 16.9286 36.5694 16.9286 39.4224V39.6724H17.1786H19.0214H19.2714V39.4224C19.2714 36.4945 21.6255 34.1386 24.55 34.1386C27.4746 34.1386 29.8286 36.4945 29.8286 39.4224V39.6724H30.0786H31.9214H32.1714V39.4224C32.1714 36.4945 34.5255 34.1386 37.45 34.1386C40.3746 34.1386 42.7286 36.4945 42.7286 39.4224V39.6724H42.9786H44.8214H45.0714V39.4224C45.0714 36.5689 43.4842 34.0869 41.161 32.7816C41.7554 32.2828 42.2444 31.6685 42.5978 30.9745C43.011 30.1632 43.2271 29.2658 43.2286 28.3552V28.3548C43.2286 25.1734 40.629 22.571 37.45 22.571C34.271 22.571 31.6714 25.1734 31.6714 28.3548C31.6714 30.1272 32.4791 31.7179 33.7388 32.7802C32.626 33.4003 31.6848 34.2878 31 35.3623C30.3155 34.2881 29.3746 33.4008 28.2621 32.7807C28.856 32.282 29.3447 31.6681 29.6978 30.9745C30.111 30.1632 30.3271 29.2658 30.3286 28.3552V28.3548C30.3286 25.1734 27.729 22.571 24.55 22.571C21.371 22.571 18.7714 25.1734 18.7714 28.3548ZM24.55 24.9156C26.4601 24.9156 27.9857 26.4424 27.9857 28.3548C27.9857 30.2672 26.4601 31.794 24.55 31.794C22.64 31.794 21.1143 30.2672 21.1143 28.3548C21.1143 26.4424 22.64 24.9156 24.55 24.9156ZM37.45 24.9156C39.3601 24.9156 40.8857 26.4424 40.8857 28.3548C40.8857 30.2672 39.3601 31.794 37.45 31.794C35.54 31.794 34.0143 30.2672 34.0143 28.3548C34.0143 26.4424 35.54 24.9156 37.45 24.9156Z" fill="white" stroke="white" stroke-width="0.5"/>
		</svg>
		<svg class="button-test" id="chat_id" width="115%" height="115%" viewBox="0 0 86 87" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="86" height="86.0811" rx="43" fill="#A700B6"/>
			<path d="M26 39.7094C26 34.347 29.9427 30 34.8062 30H41.6813C46.5448 30 50.4875 34.347 50.4875 39.7094C50.4875 45.0718 46.5448 49.419 41.6813 49.419H36.4946V54.1063C36.4946 54.1063 26 51.7626 26 39.7094Z" fill="#F4F5F6"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M43.9087 51.0861C45.1747 52.4264 46.8938 53.25 48.7874 53.25H51.3624V56.9999C51.3624 56.9999 60.9825 55.125 60.9825 45.4825C60.9825 41.1925 57.8284 37.7148 53.9376 37.7148H52.0051C52.1562 38.3476 52.2366 39.0119 52.2366 39.697C52.2366 45.2845 48.6692 49.9534 43.9087 51.0861Z" fill="#F4F5F6"/>
		</svg>
		<svg class="button-test" id="profile_id" width="90%" height="90%" viewBox="0 0 63 62" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.19751" y="0.0541992" width="62.4396" height="61.4865" rx="10" fill="#A700B6"/>
			<path d="M19.2197 40.3142C19.2197 38.7892 19.8355 37.3267 20.9316 36.2483C22.0277 35.17 23.5143 34.5642 25.0644 34.5642H36.7536C38.3037 34.5642 39.7903 35.17 40.8864 36.2483C41.9825 37.3267 42.5983 38.7892 42.5983 40.3142C42.5983 41.0767 42.2904 41.808 41.7423 42.3471C41.1943 42.8863 40.451 43.1892 39.6759 43.1892H22.142C21.367 43.1892 20.6237 42.8863 20.0757 42.3471C19.5276 41.808 19.2197 41.0767 19.2197 40.3142Z" stroke="#F8F8F8" stroke-width="3" stroke-linejoin="round"/>
			<path d="M30.909 28.8142C33.3299 28.8142 35.2925 26.8834 35.2925 24.5017C35.2925 22.12 33.3299 20.1892 30.909 20.1892C28.4881 20.1892 26.5255 22.12 26.5255 24.5017C26.5255 26.8834 28.4881 28.8142 30.909 28.8142Z" stroke="#F8F8F8" stroke-width="3"/>
		</svg>
		<svg class="button-test" id="shop_id" width="90%" height="90%" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.19751" y="0.540771" width="62.4396" height="61.4865" rx="10" fill="#A700B6"/>
			<path d="M20.6879 23.0642V20.1892H44.1794V23.0642H20.6879ZM20.6879 43.1892V34.5642H19.2197V31.6892L20.6879 24.5017H44.1794L45.6476 31.6892V34.5642H44.1794V43.1892H41.243V34.5642H35.3701V43.1892H20.6879ZM23.6244 40.3142H32.4337V34.5642H23.6244V40.3142Z" fill="#F8F8F8"/>
		</svg>
		<svg class="button-test" id="settings_id" width="90%" height="90%" viewBox="0 0 63 62" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.19751" y="0.0272217" width="62.4396" height="61.4865" rx="10" fill="#A700B6"/>
			<path d="M46.5481 28.7474L43.143 27.7474C42.9075 26.9387 42.5838 26.1575 42.1773 25.4174L43.8443 22.3474C43.9069 22.2315 43.9298 22.0989 43.9096 21.9692C43.8895 21.8395 43.8274 21.7196 43.7325 21.6274L41.3032 19.2274C41.2094 19.134 41.0876 19.0729 40.9558 19.0531C40.8239 19.0333 40.6891 19.0558 40.5713 19.1174L37.4711 20.7474C36.7114 20.328 35.9069 19.9927 35.0723 19.7474L34.0558 16.4374C34.0128 16.3154 33.9316 16.21 33.8238 16.1363C33.7161 16.0626 33.5873 16.0245 33.4561 16.0274H30.0205C29.8885 16.028 29.7601 16.07 29.6541 16.1473C29.5481 16.2247 29.4699 16.3333 29.4309 16.4574L28.4145 19.7574C27.5729 20.0014 26.7615 20.3368 25.9953 20.7574L22.9459 19.1374C22.8282 19.0758 22.6933 19.0533 22.5615 19.0731C22.4297 19.0929 22.3078 19.154 22.2141 19.2474L19.7441 21.6174C19.6492 21.7096 19.5871 21.8295 19.567 21.9592C19.5468 22.0889 19.5697 22.2215 19.6323 22.3374L21.2789 25.3374C20.8521 26.088 20.5112 26.8828 20.2625 27.7074L16.898 28.7074C16.7719 28.7457 16.6615 28.8226 16.5829 28.9269C16.5043 29.0312 16.4616 29.1575 16.4609 29.2874V32.6674C16.4616 32.7972 16.5043 32.9235 16.5829 33.0278C16.6615 33.1321 16.7719 33.2091 16.898 33.2474L20.2828 34.2474C20.5342 35.0582 20.8751 35.8395 21.2993 36.5774L19.6323 39.7174C19.5697 39.8333 19.5468 39.9659 19.567 40.0956C19.5871 40.2253 19.6492 40.3452 19.7441 40.4374L22.1734 42.8274C22.2672 42.9207 22.389 42.9818 22.5208 43.0016C22.6527 43.0214 22.7875 42.9989 22.9053 42.9374L26.0461 41.2874C26.7891 41.6818 27.5729 41.9969 28.384 42.2274L29.4004 45.5974C29.4394 45.7215 29.5176 45.8301 29.6236 45.9074C29.7296 45.9847 29.858 46.0268 29.99 46.0274H33.4256C33.5576 46.0268 33.686 45.9847 33.792 45.9074C33.898 45.8301 33.9762 45.7215 34.0152 45.5974L35.0316 42.2174C35.8358 41.9857 36.6127 41.6706 37.3492 41.2774L40.5103 42.9374C40.6281 42.9989 40.7629 43.0214 40.8948 43.0016C41.0266 42.9818 41.1484 42.9207 41.2422 42.8274L43.6715 40.4374C43.7664 40.3452 43.8285 40.2253 43.8486 40.0956C43.8688 39.9659 43.8459 39.8333 43.7833 39.7174L42.096 36.6174C42.4999 35.8901 42.8236 35.1224 43.0616 34.3274L46.4871 33.3274C46.6132 33.2891 46.7236 33.2121 46.8022 33.1078C46.8809 33.0035 46.9236 32.8772 46.9242 32.7474V29.3374C46.9302 29.213 46.8974 29.0899 46.8301 28.9844C46.7629 28.8789 46.6645 28.7962 46.5481 28.7474ZM31.7383 36.5274C30.6326 36.5274 29.5517 36.2048 28.6324 35.6005C27.713 34.9961 26.9965 34.1371 26.5733 33.1321C26.1502 32.1271 26.0395 31.0213 26.2552 29.9544C26.4709 28.8875 27.0034 27.9075 27.7852 27.1383C28.5671 26.3691 29.5632 25.8453 30.6476 25.6331C31.7321 25.4208 32.8562 25.5298 33.8777 25.946C34.8992 26.3623 35.7724 27.0673 36.3867 27.9717C37.0009 28.8762 37.3288 29.9396 37.3288 31.0274C37.3288 32.4861 36.7398 33.885 35.6914 34.9165C34.643 35.9479 33.221 36.5274 31.7383 36.5274Z" fill="#F8F8F8"/>
		</svg>
	</div>
	<div class="user">
		<img id="leftBar-userImage"  alt="">
		<div class="statu-online"></div>
	</div>`;
	content.appendChild(bar);
	const shop = content.querySelector("#shop_id");
	shop.addEventListener('click', event => {
		event.preventDefault();
		navigate('/shop');
	});
	const dashbord = content.querySelector("#dashbord_id");
	dashbord.addEventListener('click', event => {
		event.preventDefault();
		navigate('/dashboard');
	});
	const profile = content.querySelector("#profile_id");
	profile.addEventListener('click', event => {
		event.preventDefault();
		navigate('/profile');
	});
	const friendlist = content.querySelector("#friendList_id");
	friendlist.addEventListener('click', event => {
		event.preventDefault();
		navigate('/friendList');
	});
	const settings = content.querySelector("#settings_id");
	settings.addEventListener('click', event => {
		event.preventDefault();
		navigate('/settings');
	});
	const chat = content.querySelector("#chat_id");
	chat.addEventListener('click', event => {
		event.preventDefault();
		navigate('/chat');
	});
	// const profile = content.querySelector("#profile");
	// profile.addEventListener('click', event => {
	// 	event.preventDefault();
	// 	navigate('/profile');
	// });
	// const friends = content.querySelector("#friends");
	// friends.addEventListener('click', event => {
	// 	event.preventDefault();
	// 	navigate('/friends');
	// });
		let imageleft = content.querySelector("#leftBar-userImage");
		const setPlayerImage = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/users/userProfile/', {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				const data = await response.json();
				if (response.ok) {
					console.log('after await');
					imageleft.src = data.avatar;
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
	return content;
	}
}


export function renderLeftBar() {
	const leftbar = new LeftBare();
	return leftbar.render();
}