import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPageComponent } from './planning.page.component';

describe('PlanningPageComponent', () => {
  let component: PlanningPageComponent;
  let fixture: ComponentFixture<PlanningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
