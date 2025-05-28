import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSmartComponent } from './sidebar.smart.component';

describe('SidebarSmartComponent', () => {
  let component: SidebarSmartComponent;
  let fixture: ComponentFixture<SidebarSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
