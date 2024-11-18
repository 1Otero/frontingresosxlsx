import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChangeStatusAssistantComponent } from './view-change-status-assistant.component';

describe('ViewChangeStatusAssistantComponent', () => {
  let component: ViewChangeStatusAssistantComponent;
  let fixture: ComponentFixture<ViewChangeStatusAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChangeStatusAssistantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewChangeStatusAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
