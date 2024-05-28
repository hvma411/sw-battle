import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectResourcesComponent } from './select-resources.component';
import { ChoiceCardComponent } from '../choice-card/choice-card.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateService } from '../../../../../shared/services/state.service';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';

describe('SelectResourcesComponent', () => {
	let component: SelectResourcesComponent;
	let fixture: ComponentFixture<SelectResourcesComponent>;
	let stateServiceStub: Partial<StateService>;

	beforeEach(async () => {
		stateServiceStub = {
			state: of({
				gameInitation: {
					currentStep: GameInitationStep.fightType,
					selectedFightType: null,
					selectedPlayers: null,
					selectedResources: {
						opponent1: undefined,
						opponent2: undefined,
					},
				},
				resources: {
					characters: [],
					starships: [],
				},
				fightResults: [],
			}),
			resetFightResults: () => { },
		};

		await TestBed.configureTestingModule({
			declarations: [SelectResourcesComponent, ChoiceCardComponent],
			imports: [MatDialogModule, BrowserAnimationsModule],
			providers: [
				{ provide: StateService, useValue: stateServiceStub },
				MatDialog
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(SelectResourcesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
