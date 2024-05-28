import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFightTypeComponent } from './select-fight-type.component';
import { ChoiceCardComponent } from '../choice-card/choice-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateService } from '../../../../../shared/services/state.service';
import { ChoiceCard } from '../../../../../shared/enums/choice-card.enum';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';
import { Fight } from '../../../../../shared/enums/fight.enum';

describe('SelectFightTypeComponent', () => {
	let component: SelectFightTypeComponent;
	let fixture: ComponentFixture<SelectFightTypeComponent>;
	let stateServiceStub: Partial<StateService>;

	beforeEach(async () => {
		stateServiceStub = {
			setGameInitiation: jasmine.createSpy('setGameInitiation')
		};

		await TestBed.configureTestingModule({
			declarations: [SelectFightTypeComponent, ChoiceCardComponent],
			providers: [
				{ provide: StateService, useValue: stateServiceStub }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();

		fixture = TestBed.createComponent(SelectFightTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update game initiation step for characters', () => {
		component.updateGameInitiationStep(ChoiceCard.characters);
		expect(stateServiceStub.setGameInitiation).toHaveBeenCalledWith({
			currentStep: GameInitationStep.players,
			selectedFightType: Fight.characters
		});
	});

	it('should update game initiation step for starships', () => {
		component.updateGameInitiationStep(ChoiceCard.starships);
		expect(stateServiceStub.setGameInitiation).toHaveBeenCalledWith({
			currentStep: GameInitationStep.players,
			selectedFightType: Fight.starships
		});
	});
});
