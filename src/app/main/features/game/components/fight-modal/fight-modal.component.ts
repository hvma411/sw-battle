import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectedResources } from '../../../../../shared/interfaces/state.interface';
import { Fight } from '../../../../../shared/enums/fight.enum';
import { Player } from '../../../../../shared/enums/player.enum';
import { Character } from '../../../../../shared/interfaces/character.interface';
import { Starship } from '../../../../../shared/interfaces/starship.interface';
import { Opponent } from '../../../../../shared/enums/opponent.enum';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { StateService } from '../../../../../shared/services/state.service';

@Component({
	selector: 'app-fight-modal',
	templateUrl: './fight-modal.component.html',
	styleUrl: './fight-modal.component.scss'
})
export class FightModalComponent implements OnInit {
	fightInProgress: boolean = true;
	winnerOpponent: Opponent | undefined;
	isDraw: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { selectedResources: SelectedResources; fight: Fight; playerVs: Player },
		private stateService: StateService,
		public utilsService: UtilsService,
	) { }

	ngOnInit(): void {
		this.fight();
	}

	private fight = (): void => {
		if (this.data.fight === Fight.characters) {
			this.handleCharactersFight();
		}
		if (this.data.fight === Fight.starships) {
			this.handleStarshipsFight();
		}
	}

	private handleCharactersFight = (): void => {
		const { opponent1, opponent2 } = this.data.selectedResources;

		const opponent1Mass = this.getCharacterMass((opponent1 as Character).mass);
		const opponent2Mass = this.getCharacterMass((opponent2 as Character).mass);

		if (opponent1Mass > opponent2Mass) {
			this.winnerOpponent = Opponent.opponent1
		} else if (opponent2Mass > opponent1Mass) {
			this.winnerOpponent = Opponent.opponent2
		} else {
			this.isDraw = true;
		}

		this.finishFighting();
	}

	private handleStarshipsFight = (): void => {
		const { opponent1, opponent2 } = this.data.selectedResources;

		const opponent1Crew = this.getCrew((opponent1 as Starship).crew);
		const opponent2Crew = this.getCrew((opponent2 as Starship).crew);

		if (opponent1Crew > opponent2Crew) {
			this.winnerOpponent = Opponent.opponent1
		} else if (opponent2Crew > opponent1Crew) {
			this.winnerOpponent = Opponent.opponent2
		} else {
			this.isDraw = true;
		}
		
		this.finishFighting();
	}

	private getCharacterMass = (mass: string): number => {
		if (mass === 'unknown') {
			return 0;
		}
		return parseFloat(mass);
	}

	private getCrew = (crew: string): number => {
		if (crew === 'unknown') {
			return 0;
		}

		const range = crew.split('-');
		if (range.length === 2) {
			return Math.max(parseInt(range[0], 10), parseInt(range[1], 10));
		}

		return parseInt(crew, 10);
	}

	private finishFighting = (): void => {
		setTimeout(() => {
			if (!this.isDraw) {
				this.stateService.setFightResult({ winnerOpponent: this.winnerOpponent!, playerVs: this.data.playerVs, fight: this.data.fight });
			}
			this.fightInProgress = false;
		}, 2000)
	}
}