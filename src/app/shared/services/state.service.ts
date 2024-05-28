import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FightResult, GameInitation, SelectedResources, State } from '../interfaces/state.interface';
import { GameInitationStep } from '../enums/game-initiation.enum';
import { Character } from '../interfaces/character.interface';
import { Starship } from '../interfaces/starship.interface';
import { Opponent } from '../enums/opponent.enum';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private stateBS: BehaviorSubject<State> = new BehaviorSubject<State>({
		gameInitation: {
			currentStep: GameInitationStep.fightType,
			selectedFightType: null,
			selectedPlayers: null,
			selectedResources: {
				opponent1: undefined,
				opponent2: undefined,
			}
		},
		resources: {
			characters: [],
			starships: [],
		},
		fightResults: [],
	});
	public state: Observable<State> = this.stateBS.asObservable();

	setGameInitiation = (gameInitiation: Partial<GameInitation>): void => {
		this.stateBS.next({
			...this.stateBS.getValue(),
			gameInitation: {
				...this.stateBS.getValue().gameInitation,
				...gameInitiation
			}
		})
	}

	setCharacters = (characters: Character[]): void => {
		this.stateBS.next({
			...this.stateBS.getValue(),
			resources: {
				...this.stateBS.getValue().resources,
				characters
			}
		})
	}

	setStarships = (starships: Starship[]): void => {
		this.stateBS.next({
			...this.stateBS.getValue(),
			resources: {
				...this.stateBS.getValue().resources,
				starships
			}
		})
	}

	setSelectedResource = (resource: Character | Starship, opponent: Opponent): void => {
		const opponentResource = { [opponent]: resource } as Partial<SelectedResources>;
		this.stateBS.next({
			...this.stateBS.getValue(),
			gameInitation: {
				...this.stateBS.getValue().gameInitation,
				selectedResources: {
					...this.stateBS.getValue().gameInitation.selectedResources,
					...opponentResource
				}
			}
		})
	}

	selectRandomResource = (opponent: Opponent): void => {
		const fight = this.stateBS.getValue().gameInitation.selectedFightType;
		const resources = this.stateBS.getValue().resources;

		if (fight && resources[fight].length > 0) {
			const randomResourcesIdx = Math.floor(Math.random() * resources[fight].length);
			const randomResource = resources[fight][randomResourcesIdx];
			this.setSelectedResource(randomResource, opponent);
		}
	}

	setFightResult = (fightResult: FightResult): void => {
		this.stateBS.next({
			...this.stateBS.getValue(),
			fightResults: [ ...this.stateBS.getValue().fightResults, fightResult ]
		})
	}

	resetFightResults = (): void => {
		this.stateBS.next({
			...this.stateBS.getValue(),
			fightResults: []
		})
	}
}
