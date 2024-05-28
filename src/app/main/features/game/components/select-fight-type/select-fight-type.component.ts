import { Component } from '@angular/core';
import { ChoiceCard } from '../../../../../shared/enums/choice-card.enum';
import { StateService } from '../../../../../shared/services/state.service';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';
import { Fight } from '../../../../../shared/enums/fight.enum';

@Component({
	selector: 'app-select-fight-type',
	templateUrl: './select-fight-type.component.html',
	styleUrl: './select-fight-type.component.scss'
})
export class SelectFightTypeComponent {
	_ChoiceCard = ChoiceCard;

	constructor(
		private stateService: StateService,
	) {}

	updateGameInitiationStep = (choiceCard: ChoiceCard.characters | ChoiceCard.starships): void => {
		const choiceCardTofightTypeMap = {
			[ChoiceCard.characters]: Fight.characters,
			[ChoiceCard.starships]: Fight.starships
		}
		this.stateService.setGameInitiation({
			currentStep: GameInitationStep.players,
			selectedFightType: choiceCardTofightTypeMap[choiceCard]
		})
	}
}
