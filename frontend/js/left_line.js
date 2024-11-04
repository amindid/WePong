export class LeftLine extends HTMLElement
{
	constructor()
	{
		super();
		this.innerHTML = `
		<div id="img_players_left">
			<div class="container_left">
				<div class="img_player_">
				</div>
			</div>
			<div class="container_left">
				<div class="img_player_">
				</div>
			</div>
		</div>
		<div id="border_right">
			<div id="border_top_left">
			</div>
			<div id="border_bottom_left">
			</div>
		</div>
		<div id="line_line">
		</div>
		`;
	}
}

customElements.define("left-line", LeftLine);