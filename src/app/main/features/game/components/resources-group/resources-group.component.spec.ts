import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesGroupComponent } from './resources-group.component';

describe('ResourcesGroupComponent', () => {
  let component: ResourcesGroupComponent;
  let fixture: ComponentFixture<ResourcesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourcesGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourcesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
