import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './pages/intro/intro.component';


@NgModule({
	declarations: [
		IntroComponent
	],
	imports: [
		CommonModule,
		IntroRoutingModule
	]
})
export class IntroModule { }
