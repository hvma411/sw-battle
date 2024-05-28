import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoiceCardComponent } from './choice-card.component';
import { ChoiceCard } from '../../../../../shared/enums/choice-card.enum';
import { Character } from '../../../../../shared/interfaces/character.interface';
import { Fight } from '../../../../../shared/enums/fight.enum';

describe('ChoiceCardComponent', () => {
	let component: ChoiceCardComponent;
	let fixture: ComponentFixture<ChoiceCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChoiceCardComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ChoiceCardComponent);
		component = fixture.componentInstance;

		component.choiceCard = ChoiceCard.characters;
		component.labelPosition = 'left';

		component.resource = { name: 'Luke Skywalker', mass: '77' } as Character;
		component.fight = Fight.characters;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return correct label', () => {
		component.choiceCard = ChoiceCard.characters
		expect(component.getLabel()).toBe('CHARACTERS');
	});

	it('should return correct background image style', () => {
		const styles = component.getBackgroundImageStyles();
		expect(styles['background-image']).toContain('characters-fight.jpeg');
	});

	it('should return correct fight attribute', () => {
		const attribute = component.getFightAttributeToDisplay();
		expect(attribute).toBe('MASS: 77');
	});
});
