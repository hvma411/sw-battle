import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPlayersComponent } from './select-players.component';
import { ChoiceCardComponent } from '../choice-card/choice-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateService } from '../../../../../shared/services/state.service';
import { ChoiceCard } from '../../../../../shared/enums/choice-card.enum';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';
import { Player } from '../../../../../shared/enums/player.enum';

describe('SelectPlayersComponent', () => {
	let component: SelectPlayersComponent;
	let fixture: ComponentFixture<SelectPlayersComponent>;
	let stateServiceStub: Partial<StateService>;

	beforeEach(async () => {
		stateServiceStub = {
			setGameInitiation: jasmine.createSpy('setGameInitiation')
		};

		await TestBed.configureTestingModule({
			declarations: [SelectPlayersComponent, ChoiceCardComponent],
			providers: [
				{ provide: StateService, useValue: stateServiceStub }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(SelectPlayersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update game initiation step for player vs computer', () => {
		component.updateGameInitiationStep(ChoiceCard.playerVsComputer);
		expect(stateServiceStub.setGameInitiation).toHaveBeenCalledWith({
			currentStep: GameInitationStep.resource,
			selectedPlayers: Player.vsComputer
		});
	});

	it('should update game initiation step for player vs player', () => {
		component.updateGameInitiationStep(ChoiceCard.playerVsPlayer);
		expect(stateServiceStub.setGameInitiation).toHaveBeenCalledWith({
			currentStep: GameInitationStep.resource,
			selectedPlayers: Player.vsPlayer
		});
	});
});
