import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
import { Player } from '../enums/player.enum';
import { Opponent } from '../enums/opponent.enum';

describe('UtilsService', () => {
	let service: UtilsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UtilsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return PLAYER 1 for Player.vsPlayer and Opponent.opponent1', () => {
		const result = service.getOpponent(Player.vsPlayer, Opponent.opponent1);
		expect(result).toBe('PLAYER 1');
	});

	it('should return PLAYER 2 for Player.vsPlayer and Opponent.opponent2', () => {
		const result = service.getOpponent(Player.vsPlayer, Opponent.opponent2);
		expect(result).toBe('PLAYER 2');
	});

	it('should return PLAYER for Player.vsComputer and Opponent.opponent1', () => {
		const result = service.getOpponent(Player.vsComputer, Opponent.opponent1);
		expect(result).toBe('PLAYER');
	});

	it('should return COMPUTER for Player.vsComputer and Opponent.opponent2', () => {
		const result = service.getOpponent(Player.vsComputer, Opponent.opponent2);
		expect(result).toBe('COMPUTER');
	});
});
