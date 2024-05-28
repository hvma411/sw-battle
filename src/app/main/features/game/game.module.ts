import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './pages/game/game.component';
import { SharedModule } from '../../../shared/shared.module';
import { SelectFightTypeComponent } from './components/select-fight-type/select-fight-type.component';
import { SelectPlayersComponent } from './components/select-players/select-players.component';
import { ChoiceCardComponent } from './components/choice-card/choice-card.component';
import { GameInitiationStepHeaderComponent } from './components/game-initiation-step-header/game-initiation-step-header.component';
import { SelectResourcesComponent } from './components/select-resources/select-resources.component';
import { ResourcesGroupComponent } from './components/resources-group/resources-group.component';
import { OpponentInfoComponent } from './components/opponent-info/opponent-info.component';
import { FightModalComponent } from './components/fight-modal/fight-modal.component';


@NgModule({
	declarations: [
		GameComponent,
		ChoiceCardComponent,
		SelectFightTypeComponent,
		SelectPlayersComponent,
		GameInitiationStepHeaderComponent,
		SelectResourcesComponent,
		ResourcesGroupComponent,
		OpponentInfoComponent,
 		FightModalComponent
	],
	imports: [
		CommonModule,
		GameRoutingModule,
		SharedModule
	]
})
export class GameModule { }
