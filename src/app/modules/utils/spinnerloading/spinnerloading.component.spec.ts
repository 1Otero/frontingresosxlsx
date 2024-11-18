import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerloadingComponent } from './spinnerloading.component';

describe('SpinnerloadingComponent', () => {
  let component: SpinnerloadingComponent;
  let fixture: ComponentFixture<SpinnerloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerloadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
