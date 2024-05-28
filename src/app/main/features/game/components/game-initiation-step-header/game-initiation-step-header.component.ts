import { Component, Input } from '@angular/core';
import { StateService } from '../../../../../shared/services/state.service';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';

@Component({
  selector: 'app-game-initiation-step-header',
  templateUrl: './game-initiation-step-header.component.html',
  styleUrl: './game-initiation-step-header.component.scss'
})
export class GameInitiationStepHeaderComponent {
	@Input({ required: true }) name!: string;
	@Input({ required: true }) currentStep: GameInitationStep = GameInitationStep.fightType;
	@Input({ required: true }) backButtonEnabled: boolean = false;

	constructor(
		private stateService: StateService
	) {}

	goBack = (): void => {
		if (this.currentStep !== GameInitationStep.fightType) {
			const goBackMap = {
				[GameInitationStep.players]: GameInitationStep.fightType,
				[GameInitationStep.resource]: GameInitationStep.players,
			}
			this.stateService.setGameInitiation({
				currentStep: goBackMap[this.currentStep],
			})
		}

	}
}
