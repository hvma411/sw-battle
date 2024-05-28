import { Component } from '@angular/core';
import { ChoiceCard } from '../../../../../shared/enums/choice-card.enum';
import { StateService } from '../../../../../shared/services/state.service';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';
import { Player } from '../../../../../shared/enums/player.enum';

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.component.html',
  styleUrl: './select-players.component.scss'
})
export class SelectPlayersComponent {
	_ChoiceCard = ChoiceCard;

	constructor(
		private stateService: StateService,
	) {}

	updateGameInitiationStep = (choiceCard: ChoiceCard.playerVsComputer | ChoiceCard.playerVsPlayer): void => {
		const choiceCardToPlayerTypeMap = {
			[ChoiceCard.playerVsComputer]: Player.vsComputer,
			[ChoiceCard.playerVsPlayer]: Player.vsPlayer
		}
		this.stateService.setGameInitiation({
			currentStep: GameInitationStep.resource,
			selectedPlayers: choiceCardToPlayerTypeMap[choiceCard]
		})
	}
}
