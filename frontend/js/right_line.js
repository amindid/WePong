export class RightLine extends HTMLElement
{
	constructor()
	{
		super();
		this.innerHTML = `
		<div id="line_line">
		</div>
		<div id="border_right">
		<div id="border_top_right">
		</div>
		<div id="border_bottom_right">
		</div>
		</div>
		<div id="img_players_right">
			<div class="container_right">
				<div class="img_player_">
				</div>
			</div>
			<div class="container_right">
				<div class="img_player_">
				</div>
			</div>
		</div>
		`;
	}
}

customElements.define("right-line", RightLine);