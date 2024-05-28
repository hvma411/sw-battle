import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInitiationStepHeaderComponent } from './game-initiation-step-header.component';

describe('GameInitiationStepHeaderComponent', () => {
  let component: GameInitiationStepHeaderComponent;
  let fixture: ComponentFixture<GameInitiationStepHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameInitiationStepHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameInitiationStepHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
