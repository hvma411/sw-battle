import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ChoiceCard } from '../../../../../shared/enums/choice-card.enum';
import { Opponent } from '../../../../../shared/enums/opponent.enum';
import { Subscription, map } from 'rxjs';
import { StateService } from '../../../../../shared/services/state.service';
import { Resources, SelectedResources } from '../../../../../shared/interfaces/state.interface';
import { Fight } from '../../../../../shared/enums/fight.enum';
import { Player } from '../../../../../shared/enums/player.enum';
import { Character } from '../../../../../shared/interfaces/character.interface';
import { Starship } from '../../../../../shared/interfaces/starship.interface';
import { MatDialog } from '@angular/material/dialog';
import { FightModalComponent } from '../fight-modal/fight-modal.component';

@Component({
	selector: 'app-select-resources',
	templateUrl: './select-resources.component.html',
	styleUrl: './select-resources.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectResourcesComponent implements OnInit, OnDestroy {
	_ChoiceCard = ChoiceCard;
	_Opponent = Opponent;

	subscription: Subscription = new Subscription();
	resources: Resources | undefined;
	fight: Fight | null = null;
	playerVs: Player | null = null;
	selectedResources: SelectedResources | undefined;

	constructor(
		private stateService: StateService,
		private cdr: ChangeDetectorRef,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getFightData();
	}

	ngOnDestroy(): void {
		this.stateService.resetFightResults();
		this.subscription.unsubscribe();
	}

	getResourcesToDisplay = (): Character[] | Starship[] => {
		if (this.fight === Fight.characters) {
			return this.resources?.characters ?? [];
		}
		if (this.fight === Fight.starships) {
			return this.resources?.starships ?? [];
		}
		return [];
	}

	openFightModal = (): void => {
		this.dialog.open(FightModalComponent, {
			data: {
				selectedResources: this.selectedResources,
				fight: this.fight,
				playerVs: this.playerVs
			},
		});
	}

	private getFightData = (): void => {
		this.subscription.add(
			this.stateService.state.pipe(
				map((state) => ({
					selectedResources: state.gameInitation.selectedResources,
					selectedFightType: state.gameInitation.selectedFightType,
					selectedPlayers: state.gameInitation.selectedPlayers,
					resources: state.resources,
				})),
			).subscribe({
				next: ({ selectedResources, selectedFightType, selectedPlayers, resources }) => {
					this.resources = resources;
					this.selectedResources = selectedResources;
					this.fight = selectedFightType;
					this.playerVs = selectedPlayers
					this.cdr.detectChanges();
				},
			})
		)
	}
}
