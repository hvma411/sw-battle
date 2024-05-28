import { Injectable } from '@angular/core';
import { Player } from '../enums/player.enum';
import { Opponent } from '../enums/opponent.enum';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	getOpponent = (playerVs: Player, opponent: Opponent): string => {
		if (playerVs === Player.vsPlayer) {
			return opponent === Opponent.opponent1 ? 'PLAYER 1' : 'PLAYER 2'
		}
		return opponent === Opponent.opponent1 ? 'PLAYER' : 'COMPUTER'
	}
}
