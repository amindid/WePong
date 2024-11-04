import { LeftLine } from "./left_line.js";
import { RightLine } from "./right_line.js";
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';

class FourPlayers
{
	content = document.createElement('span');
	constructor()
	{
	}
	render()
	{
		const page = document.createDocumentFragment();
		// page.appendChild(renderLeftBar());
		this.content.className = 'four-players';
		this.content.innerHTML = `
		<div id="TOURNEMENT">
			<div class="line">
			</div>
			<div class="TOURNEMENT_">
				<h1> TOURNEMENT </h1>
			</div>
			<div class="line">
			</div>
		</div>
		<div id="tour_4_players">
			<div class="container_left_line">
				<left-line>
				</left-line>
			</div>
			<div id="final_img">
				<div id="player_final_left">
					<div class="img_player_">
					</div>
				</div>
				<div id="img__player_winner">
					<div id="img__"> 
					<img src="../images/Group1452.svg" width="100%" height="100%">
					</div>
					<div id="player_winner_star">
						<img src="../images/star.svg" width="20%" height="20%">
						<div class="img_player_final">
						</div>
					</div>
				</div>
				<div id="player_final_right">
					<div class="img_player_">
					</div>
				</div>
			</div>
			<div class="container_left_line">
				<right-line>
				</right-line>
			</div>
		</div>
		<div id="winner_quit">
			<div id="winner">
				<h1 id="display_winner"> WINNER </h1>
			</div>
			<div id="quit">
				<button id="quit-button">Quit</button>
			</div>
		</div>
				`;
		page.appendChild(this.content)
		// page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
		const quit = this.content.querySelector("#quit-button");
		quit.addEventListener('click', event =>
		{
			event.preventDefault();
			navigate('/tournement/create');
		});
		return page;
	}
}

export function renderFourPlayers() {
	console.log("render Fourplayers");
	const page = new FourPlayers();
	return page.render();
}

