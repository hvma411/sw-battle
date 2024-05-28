import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../../../../shared/services/state.service';
import { Subscription } from 'rxjs';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';
import { SwapiService } from '../../../../../shared/services/swapi.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
	_GameInitiationStep = GameInitationStep;

	subscription: Subscription = new Subscription();
	gameInitiationStep: GameInitationStep = GameInitationStep.fightType;
	backButtonEnabled: boolean = false;

	constructor(
		private stateService: StateService,
		private swapiService: SwapiService,
	) {}

	ngOnInit(): void {
		this.initGameData();
		this.listenForGameInitiationStepChanges();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private listenForGameInitiationStepChanges = (): void => {
		this.subscription.add(
			this.stateService.state.subscribe({
				next: (state) => {
					this.gameInitiationStep = state.gameInitation.currentStep
					this.backButtonEnabled = this.gameInitiationStep !== GameInitationStep.fightType
				},
			})
		)
	}

	private initGameData = (): void => {
		this.getAllCharacters();
		this.getAllStarships();
	}

	private getAllCharacters = (): void => {
		this.subscription.add(
			this.swapiService.getAllCharacters().subscribe({
				next: (characters) => {
					this.stateService.setCharacters(characters);
				},
			})
		)
	}

	private getAllStarships = (): void => {
		this.subscription.add(
			this.swapiService.getAllStarships().subscribe({
				next: (starships) => {
					this.stateService.setStarships(starships);
				},
			})
		)
	}
}
