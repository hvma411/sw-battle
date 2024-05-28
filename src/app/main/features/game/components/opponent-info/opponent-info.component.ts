import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Opponent } from '../../../../../shared/enums/opponent.enum';
import { Player } from '../../../../../shared/enums/player.enum';
import { StateService } from '../../../../../shared/services/state.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { Subscription, map } from 'rxjs';
import { Fight } from '../../../../../shared/enums/fight.enum';

@Component({
	selector: 'app-opponent-info',
	templateUrl: './opponent-info.component.html',
	styleUrl: './opponent-info.component.scss'
})
export class OpponentInfoComponent implements OnInit, OnDestroy {
	@Input({ required: true }) resourcesOptionsPosition!: 'right' | 'left';
	@Input({ required: true }) opponent: Opponent | undefined;
	@Input({ required: true }) playerVs: Player | null | undefined;
	@Input({ required: true }) fight: Fight | null | undefined;

	subscription: Subscription = new Subscription();
	opponentWins: number = 0;

	constructor(
		private stateService: StateService,
		private cdr: ChangeDetectorRef,
		public utilsService: UtilsService,
	) { }

	ngOnInit(): void {
		this.getOpponentWins();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	randomizeResource = (): void => {
		if (this.opponent) {
			this.stateService.selectRandomResource(this.opponent);
		}
	}

	private getOpponentWins = (): void => {
		this.subscription.add(
			this.stateService.state.pipe(
				map(state => state.fightResults)
			).subscribe((results) => {
				if (this.opponent && this.playerVs) {
					this.opponentWins = results.filter((result) =>
						result.winnerOpponent === this.opponent &&
						result.playerVs === this.playerVs &&
						result.fight === this.fight
					).length;
					this.cdr.detectChanges();
				}
			})
		);
	}
}
