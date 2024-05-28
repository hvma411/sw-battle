import { Fight } from "../enums/fight.enum";
import { GameInitationStep } from "../enums/game-initiation.enum";
import { Opponent } from "../enums/opponent.enum";
import { Player } from "../enums/player.enum";
import { Character } from "./character.interface";
import { Starship } from "./starship.interface";

export interface State {
	gameInitation: GameInitation;
	resources: Resources;
	fightResults: FightResult[]
}

export interface GameInitation {
	currentStep: GameInitationStep,
	selectedFightType: Fight | null,
	selectedPlayers: Player | null,
	selectedResources: SelectedResources;
}

export interface Resources {
	characters: Character[];
	starships: Starship[];
}

export interface SelectedResources {
	opponent1?: Character | Starship | undefined;
	opponent2?: Character | Starship | undefined;
}

export interface FightResult {
	winnerOpponent: Opponent;
	playerVs: Player;
	fight: Fight;
}