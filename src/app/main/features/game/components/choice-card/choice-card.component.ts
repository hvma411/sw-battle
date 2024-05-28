import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChoiceCard } from '../../../../../shared/enums/choice-card.enum';
import { Opponent } from '../../../../../shared/enums/opponent.enum';
import { Character } from '../../../../../shared/interfaces/character.interface';
import { Starship } from '../../../../../shared/interfaces/starship.interface';
import { Fight } from '../../../../../shared/enums/fight.enum';
import { Player } from '../../../../../shared/enums/player.enum';

@Component({
	selector: 'app-choice-card',
	templateUrl: './choice-card.component.html',
	styleUrl: './choice-card.component.scss'
})
export class ChoiceCardComponent {
	@Input({ required: true }) choiceCard!: ChoiceCard;
	@Input({ required: true }) labelPosition!: 'left' | 'right';

	@Input() resourcePreviewImage: string | undefined;
	@Input() opponent: Opponent | undefined;
	@Input() fight: Fight | null | undefined;
	@Input() playerVs: Player | null | undefined;
	@Input() resource: Character | Starship | undefined;

	@Output() action: EventEmitter<void> = new EventEmitter<void>();

	_ChoiceCard = ChoiceCard;

	getLabel = (): string => {
		if (this.choiceCard === ChoiceCard.resourcePreview && this.resource) {
			return this.resource.name;
		}
		return this.choiceCard.toUpperCase();
	}

	getBackgroundImageStyles = (): { [klass: string]: any } => {
		const baseSrc = '/assets/images/';
		const choiceCardImagesMap = {
			[ChoiceCard.characters]: 'characters-fight.jpeg',
			[ChoiceCard.starships]: 'starships-fight.jpeg',
			[ChoiceCard.playerVsComputer]: 'player-vs-computer.jpeg',
			[ChoiceCard.playerVsPlayer]: 'player-vs-player.jpeg',
			[ChoiceCard.resourcePreview]: this.getResourcePreviewImage(),
		}
		return { 'background-image': `url(${baseSrc}${choiceCardImagesMap[this.choiceCard]})` };
	}

	getFightAttributeToDisplay = (): string => {
		if (this.resource) {
			if (this.fight === Fight.starships) {
				return `CREW: ${(this.resource as Starship).crew.toUpperCase()}`
			} else {
				return `MASS: ${(this.resource as Character).mass.toUpperCase()}`
			}
		}
		return '';
	}

	private getResourcePreviewImage = (): string => {
		if (this.resourcePreviewImage) {
			return this.resourcePreviewImage
		}
		return this.fight === Fight.characters ? 'character-avatar.jpeg' : 'starships-avatar.jpeg'
	}
}
