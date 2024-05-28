import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { StateService } from '../../../../../shared/services/state.service';
import { GameInitationStep } from '../../../../../shared/enums/game-initiation.enum';
import { SwapiService } from '../../../../../shared/services/swapi.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GameComponent', () => {
	let component: GameComponent;
	let fixture: ComponentFixture<GameComponent>;
	let stateServiceStub: Partial<StateService>;
	let swapiServiceStub: Partial<SwapiService>;

	beforeEach(async () => {
		stateServiceStub = {
			state: of({
				gameInitation: {
					currentStep: GameInitationStep.fightType,
					selectedFightType: null,
					selectedPlayers: null,
					selectedResources: {
						opponent1: undefined,
						opponent2: undefined
					}
				},
				resources: {
					characters: [],
					starships: [],
				},
				fightResults: [],
			}),
			setCharacters: jasmine.createSpy('setCharacters'),
			setStarships: jasmine.createSpy('setStarships')
		};

		swapiServiceStub = {
			getAllCharacters: jasmine.createSpy('getAllCharacters').and.returnValue(of([])),
			getAllStarships: jasmine.createSpy('getAllStarships').and.returnValue(of([]))
		};

		await TestBed.configureTestingModule({
			declarations: [GameComponent],
			imports: [HttpClientTestingModule],
			providers: [
				{ provide: StateService, useValue: stateServiceStub },
				{ provide: SwapiService, useValue: swapiServiceStub }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(GameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize game data on init', () => {
		component.ngOnInit();
		expect(swapiServiceStub.getAllCharacters).toHaveBeenCalled();
		expect(swapiServiceStub.getAllStarships).toHaveBeenCalled();
	});

	it('should hide button on correct step', () => {
		component.ngOnInit();
		expect(component.gameInitiationStep).toBe(GameInitationStep.fightType);
		expect(component.backButtonEnabled).toBe(false);
	});

	it('should set characters in state service when getAllCharacters is called', () => {
		component.ngOnInit();
		expect(stateServiceStub.setCharacters).toHaveBeenCalledWith([]);
	});

	it('should set starships in state service when getAllStarships is called', () => {
		component.ngOnInit();
		expect(stateServiceStub.setStarships).toHaveBeenCalledWith([]);
	});

	afterEach(() => {
		fixture.destroy();
	});
});
