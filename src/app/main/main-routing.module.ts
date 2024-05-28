import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from '../shared/configuration/app-route.enum';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/intro/intro.module').then((m) => m.IntroModule)
	},
	{
		path: AppRoute.game,
		loadChildren: () => import('./features/game/game.module').then((m) => m.GameModule)
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
