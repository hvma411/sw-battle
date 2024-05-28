import { Component, OnInit } from '@angular/core';
import { AppRoute } from '../../../../../shared/configuration/app-route.enum';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.component.html',
	styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {
	_AppRoute = AppRoute;
	
	isButtonVisible: boolean = false;

	ngOnInit(): void {
		this.setButtonVisibility();
	}

	private setButtonVisibility = (): void => {
		setTimeout(() => {
			this.isButtonVisible = true;
		}, 5000);
	}
}
