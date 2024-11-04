import { LeftLine } from "./left_line.js";
import { RightLine } from "./right_line.js";
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';


class EightPlayers
{
	content = document.createElement('span');
	constructor()
	{
	}
	render()
	{
		const page = document.createDocumentFragment();
		// page.appendChild(renderLeftBar());
		this.content.className = 'eight-players';
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
				<div class="tour_8_players">
					<div class="quarter_final_left">
						<div class="quarter_final_left_">
							<left-line>
							</left-line>
						</div>
						<div class="quarter_final_left_">
							<left-line>
							</left-line>
						</div>
					</div>
					<div class="demi_final_left">
						<left-line>
						</left-line>
					</div>
					<div class="final">
						<div id="winner">
						<img src="../images/star.svg" width="60%">
						</div>
						<div class="img_player_">
						</div>
						<div id="winner">
							<h1 id="display_winner"> WINNER </h1>
						</div>
					</div>
					<div class="demi_final_right">
						<right-line>
						</right-line>
					</div>
					<div class="quarter_final_right">
						<div class="quarter_final_left_">
							<right-line>
							</right-line>
						</div>
						<div class="quarter_final_left_">
							<right-line>
							</right-line>
						</div>
					</div>
				</div>
				<div id="winner_quit">
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


export function renderEightPlayers() {
	console.log("render Fourplayers");
	const page = new EightPlayers();
	return page.render();
}