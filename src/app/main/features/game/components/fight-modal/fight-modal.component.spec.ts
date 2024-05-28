import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FightModalComponent } from './fight-modal.component';
import { of } from 'rxjs';
import { Character } from '../../../../../shared/interfaces/character.interface';
import { SelectedResources } from '../../../../../shared/interfaces/state.interface';
import { Fight } from '../../../../../shared/enums/fight.enum';
import { Player } from '../../../../../shared/enums/player.enum';
import { StateService } from '../../../../../shared/services/state.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { Opponent } from '../../../../../shared/enums/opponent.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('FightModalComponent', () => {
	let component: FightModalComponent;
	let fixture: ComponentFixture<FightModalComponent>;

	const mockDialogData = {
		selectedResources: {
			opponent1: { mass: '77' } as Character,
			opponent2: { mass: '85' } as Character
		} as SelectedResources,
		fight: Fight.characters,
		playerVs: Player.vsPlayer
	};

	const stateServiceStub = {
		setFightResult: jasmine.createSpy('setFightResult'),
		state: of({})
	};

	const utilsServiceStub = {};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FightModalComponent],
			imports: [MatProgressSpinnerModule],
			providers: [
				{ provide: MAT_DIALOG_DATA, useValue: mockDialogData },
				{ provide: StateService, useValue: stateServiceStub },
				{ provide: UtilsService, useValue: utilsServiceStub }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(FightModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	beforeEach(() => {
		component.winnerOpponent = undefined;
		component.isDraw = false;
		component.fightInProgress = true;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should determine the winner correctly for characters fight', () => {
		component.ngOnInit();
		expect(component.isDraw).toBe(false);
		expect(component.winnerOpponent).toBe(Opponent.opponent2);
	});

	it('should determine the characters fight as a draw correctly', () => {
		(component.data.selectedResources.opponent2 as Character).mass = '77';
		component.ngOnInit();
		expect(component.isDraw).toBe(true);
		expect(component.winnerOpponent).toBeUndefined();
	});

	it('should set fight result correctly after fight', (done) => {
		component.ngOnInit();
		setTimeout(() => {
			expect(stateServiceStub.setFightResult).toHaveBeenCalledWith({
				winnerOpponent: Opponent.opponent2,
				playerVs: component.data.playerVs,
				fight: component.data.fight
			});
			done();
		}, 2000);
	});

	it('should set fightInProgress to false after fight', (done) => {
		component.ngOnInit();
		setTimeout(() => {
			expect(component.fightInProgress).toBe(false);
			done();
		}, 2000);
	});
});
