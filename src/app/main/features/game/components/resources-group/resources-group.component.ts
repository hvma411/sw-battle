import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { StateService } from '../../../../../shared/services/state.service';
import { Subscription, distinctUntilChanged, map } from 'rxjs';
import { Fight } from '../../../../../shared/enums/fight.enum';
import { Character } from '../../../../../shared/interfaces/character.interface';
import { Starship } from '../../../../../shared/interfaces/starship.interface';
import { Opponent } from '../../../../../shared/enums/opponent.enum';
import { Player } from '../../../../../shared/enums/player.enum';

@Component({
	selector: 'app-resources-group',
	templateUrl: './resources-group.component.html',
	styleUrl: './resources-group.component.scss',
})
export class ResourcesGroupComponent implements OnInit, OnDestroy {
	@Input({ required: true }) opponent!: Opponent;
	@Input({ required: true }) resources!: Character[] | Starship[];

	@ViewChildren('resourceItem') resourceItems!: QueryList<ElementRef>;

	_Fight = Fight;

	subscription: Subscription = new Subscription();
	fight: Fight | null | undefined;
	playerVs: Player | null | undefined;
	selectedResource: Character | Starship | undefined;
	selectingResourceDisabled: boolean = false;

	constructor(
		private stateService: StateService,
		private cdr: ChangeDetectorRef,
	) { }

	ngOnInit(): void {
		this.getFightData();
		this.getSelectedResource();
		this.stateService.selectRandomResource(this.opponent);
	};

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	selectResource = (resource: Character | Starship): void => {
		if (!this.selectingResourceDisabled) {
			this.stateService.setSelectedResource(resource, this.opponent);
		}
	}

	private scrollToSelected(): void {
		if (this.selectedResource) {
			setTimeout(() => {
				const selectedElement = this.resourceItems.find(item => item.nativeElement.classList.contains('selected'));
				if (selectedElement) {
					selectedElement.nativeElement.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
				}
			}, 100)
		}
	}

	private getSelectedResource = (): void => {
		this.subscription.add(
			this.stateService.state.pipe(
				map((state) => ({
					selectedResource: state.gameInitation.selectedResources[this.opponent]
				})),
			).subscribe({
				next: ({ selectedResource }) => {
					this.selectedResource = selectedResource;
					this.cdr.detectChanges();
					this.scrollToSelected();
				},
			})
		)
	}

	private getFightData = (): void => {
		this.subscription.add(
			this.stateService.state.pipe(
				map((state) => ({
					fight: state.gameInitation.selectedFightType,
					playerVs: state.gameInitation.selectedPlayers
				})),
				distinctUntilChanged((prev, curr) =>
					prev.fight === curr.fight && prev.playerVs === curr.playerVs
				)
			).subscribe({
				next: ({ fight, playerVs }) => {
					this.fight = fight;
					this.playerVs = playerVs;
					this.setSelectingResourceDisabled();
				},
			})
		);
	}

	private setSelectingResourceDisabled = (): void => {
		this.selectingResourceDisabled = this.playerVs === Player.vsComputer && this.opponent === Opponent.opponent2;
	}
}
