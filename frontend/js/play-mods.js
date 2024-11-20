import { navigate } from './router.js';

class PlayMods {
	constructor() {}

	render() {
		const content = document.createDocumentFragment();
		const play_mods = document.createElement('div');
		play_mods.className = 'play-mods';
		play_mods.innerHTML = `<div class="play">
		<svg width="80%" height="80%" viewBox="0 0 169 52" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_593_16619)">
			<path d="M15.9867 44H6.68672C5.92672 44 5.36672 43.84 5.00672 43.52C4.68672 43.16 4.52672 42.6 4.52672 41.84V2.96C4.52672 2.2 4.68672 1.66 5.00672 1.34C5.36672 0.979998 5.92672 0.799998 6.68672 0.799998H25.0467C30.4867 0.799998 34.2067 1.88 36.2067 4.04C38.2067 6.2 39.2067 9.02 39.2067 12.5V20.18C39.2067 23.66 38.2067 26.48 36.2067 28.64C34.2067 30.8 30.4867 31.88 25.0467 31.88H18.1467V41.84C18.1467 42.6 17.9667 43.16 17.6067 43.52C17.2867 43.84 16.7467 44 15.9867 44ZM24.2067 26.78C26.0867 26.78 27.6067 26.58 28.7667 26.18C29.9667 25.78 30.8867 25.24 31.5267 24.56C32.1667 23.84 32.6067 23 32.8467 22.04C33.0867 21.04 33.2067 19.96 33.2067 18.8V14.36C33.2067 13.2 33.0867 12.12 32.8467 11.12C32.6067 10.12 32.1667 9.26 31.5267 8.54C30.8867 7.82 29.9667 7.26 28.7667 6.86C27.6067 6.42 26.0867 6.2 24.2067 6.2H11.2467V38.6H11.8467V26.78H24.2067ZM11.8467 26.18V6.8H24.2067C25.9667 6.8 27.3867 7 28.4667 7.4C29.5867 7.76 30.4467 8.28 31.0467 8.96C31.6467 9.64 32.0467 10.44 32.2467 11.36C32.4867 12.28 32.6067 13.28 32.6067 14.36V18.8C32.6067 19.88 32.4867 20.88 32.2467 21.8C32.0467 22.68 31.6467 23.46 31.0467 24.14C30.4467 24.78 29.5867 25.28 28.4667 25.64C27.3867 26 25.9667 26.18 24.2067 26.18H11.8467ZM18.0267 12.02V21.08H23.4267C24.5867 21.08 25.3467 20.78 25.7067 20.18C26.0667 19.58 26.2467 18.9 26.2467 18.14V14.96C26.2467 14.2 26.0667 13.52 25.7067 12.92C25.3467 12.32 24.5867 12.02 23.4267 12.02H18.0267ZM78.1252 44H47.5852C46.8252 44 46.2652 43.84 45.9052 43.52C45.5852 43.16 45.4252 42.6 45.4252 41.84V2.96C45.4252 2.2 45.5852 1.66 45.9052 1.34C46.2652 0.979998 46.8252 0.799998 47.5852 0.799998H56.8852C57.6452 0.799998 58.1852 0.979998 58.5052 1.34C58.8652 1.66 59.0452 2.2 59.0452 2.96V32.66H67.2652V22.94C67.2652 22.18 67.4252 21.64 67.7452 21.32C68.1052 20.96 68.6652 20.78 69.4252 20.78H78.1252C78.8852 20.78 79.4252 20.96 79.7452 21.32C80.1052 21.64 80.2852 22.18 80.2852 22.94V41.84C80.2852 42.6 80.1052 43.16 79.7452 43.52C79.4252 43.84 78.8852 44 78.1252 44ZM51.9652 38.6H74.0452V26.18H73.4452V38H52.5652V6.2H51.9652V38.6ZM93.2039 25.82C93.2039 24.74 93.2839 23.74 93.4439 22.82C93.6439 21.9 93.8839 21.04 94.1639 20.24L98.0039 10.4C98.4039 9.4 98.8439 8.56 99.3239 7.88C99.8039 7.16 100.644 6.8 101.844 6.8H107.724C108.844 6.8 109.644 7.16 110.124 7.88C110.604 8.56 111.064 9.42 111.504 10.46L115.644 20.24C115.924 21.04 116.144 21.9 116.304 22.82C116.504 23.74 116.604 24.74 116.604 25.82V27.68H93.2039V25.82ZM102.804 13.4L99.9839 22.52H109.404L106.584 13.4C106.424 13.04 106.244 12.78 106.044 12.62C105.884 12.46 105.684 12.38 105.444 12.38H103.944C103.704 12.38 103.484 12.46 103.284 12.62C103.124 12.78 102.964 13.04 102.804 13.4ZM116.604 38.6H117.204V25.82C117.204 24.7 117.104 23.68 116.904 22.76C116.744 21.8 116.504 20.88 116.184 20L112.044 10.22C111.564 9.06 111.044 8.1 110.484 7.34C109.964 6.58 109.044 6.2 107.724 6.2H101.844C100.484 6.2 99.5239 6.58 98.9639 7.34C98.4039 8.1 97.9039 9.04 97.4639 10.16L93.6239 20C93.3039 20.88 93.0439 21.8 92.8439 22.76C92.6839 23.68 92.6039 24.7 92.6039 25.82V38.6H93.2039V28.28H116.604V38.6ZM99.3839 41.84C99.3839 42.6 99.2039 43.16 98.8439 43.52C98.5239 43.84 97.9839 44 97.2239 44H88.4039C87.6439 44 87.0839 43.84 86.7239 43.52C86.4039 43.16 86.2439 42.6 86.2439 41.84V26C86.2439 24.8 86.4239 23.42 86.7839 21.86C87.1839 20.3 87.7839 18.48 88.5839 16.4L93.8039 2.78C94.0439 2.1 94.4039 1.6 94.8839 1.28C95.4039 0.959999 96.0639 0.799998 96.8639 0.799998H113.004C113.764 0.799998 114.384 0.959999 114.864 1.28C115.384 1.6 115.764 2.1 116.004 2.78L121.224 16.4C122.024 18.48 122.604 20.3 122.964 21.86C123.364 23.42 123.564 24.8 123.564 26V41.84C123.564 42.6 123.384 43.16 123.024 43.52C122.704 43.84 122.164 44 121.404 44H112.344C111.544 44 110.944 43.84 110.544 43.52C110.184 43.16 110.004 42.6 110.004 41.84V33.44H99.3839V41.84ZM151.349 44H141.629C140.869 44 140.309 43.84 139.949 43.52C139.629 43.16 139.469 42.6 139.469 41.84V34.16L130.289 21.86C129.369 20.62 128.749 19.54 128.429 18.62C128.149 17.7 128.009 16.32 128.009 14.48V2.96C128.009 2.2 128.169 1.66 128.489 1.34C128.849 0.979998 129.409 0.799998 130.169 0.799998H139.409C140.169 0.799998 140.709 0.979998 141.029 1.34C141.389 1.66 141.569 2.2 141.569 2.96V12.8C141.569 13.2 141.589 13.62 141.629 14.06C141.669 14.5 141.829 14.92 142.109 15.32L144.869 19.64C145.069 20 145.269 20.26 145.469 20.42C145.709 20.58 145.989 20.66 146.309 20.66H146.909C147.229 20.66 147.489 20.58 147.689 20.42C147.929 20.26 148.149 20 148.349 19.64L151.109 15.32C151.389 14.92 151.549 14.5 151.589 14.06C151.629 13.62 151.649 13.2 151.649 12.8V2.96C151.649 2.2 151.809 1.66 152.129 1.34C152.489 0.979998 153.049 0.799998 153.809 0.799998H162.749C163.509 0.799998 164.049 0.979998 164.369 1.34C164.729 1.66 164.909 2.2 164.909 2.96V14.48C164.909 16.32 164.749 17.7 164.429 18.62C164.109 19.54 163.509 20.62 162.629 21.86L153.509 34.22V41.84C153.509 42.6 153.329 43.16 152.969 43.52C152.649 43.84 152.109 44 151.349 44ZM147.209 28.34C148.129 28.34 148.929 28.14 149.609 27.74C150.329 27.34 151.009 26.7 151.649 25.82L157.649 17.72C158.129 17.08 158.389 16.38 158.429 15.62C158.509 14.82 158.549 13.98 158.549 13.1V6.2H157.949V13.1C157.949 13.94 157.909 14.76 157.829 15.56C157.749 16.32 157.509 16.96 157.109 17.48L151.109 25.58C150.509 26.34 149.889 26.9 149.249 27.26C148.649 27.58 147.969 27.74 147.209 27.74H145.589C144.909 27.74 144.229 27.58 143.549 27.26C142.869 26.94 142.269 26.38 141.749 25.58L135.929 17.48C135.529 16.88 135.289 16.22 135.209 15.5C135.129 14.74 135.089 13.94 135.089 13.1V6.2H134.489V13.1C134.489 13.98 134.529 14.82 134.609 15.62C134.689 16.42 134.949 17.12 135.389 17.72L141.209 25.82C141.849 26.7 142.509 27.34 143.189 27.74C143.909 28.14 144.709 28.34 145.589 28.34H146.189V38.6H146.789V28.34H147.209Z" fill="#FF90FB"/>
			</g>
			<defs>
			<filter id="filter0_d_593_16619" x="0.526611" y="0.800049" width="168.382" height="51.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix"/>
			<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
			<feOffset dy="4"/>
			<feGaussianBlur stdDeviation="2"/>
			<feComposite in2="hardAlpha" operator="out"/>
			<feColorMatrix type="matrix" values="0 0 0 0 0.998047 0 0 0 0 0.998047 0 0 0 0 0.998047 0 0 0 0.4 0"/>
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_593_16619"/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_593_16619" result="shape"/>
			</filter>
			</defs>
			</svg>
	</div>
	<div class="mods">
		<img class="mod"  id="tournement_id" src="../images/tournement-icon.svg" alt="">
		<img  class="mod" id="local-game-id" src="../images/local-icon.svg" alt="">
		<img  class="mod" id="gameonline_id" src="../images/online-icon.svg" alt="">
	</div>`;
	content.appendChild(play_mods);
	const tournament = content.querySelector("#tournement_id");
	tournament.addEventListener('click', event => {
		event.preventDefault();
		localStorage.clear();
		navigate('/tournement');
	});
	const game_online = content.querySelector("#gameonline_id");
	game_online.addEventListener('click', event => {
		event.preventDefault();
		navigate('/game-online');
	});
	const local_game = content.querySelector("#local-game-id");
	local_game.addEventListener('click', event => {
		event.preventDefault();
		localStorage.clear();
		localStorage.setItem("local-game", "1");
		navigate('/local-game');
	});

	return content;
	}
}

export function renderPlayMods() {
	const play_mods = new PlayMods();
	return play_mods.render();
}
