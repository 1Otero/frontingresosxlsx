import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpfileComponent } from './upfile.component';

describe('UpfileComponent', () => {
  let component: UpfileComponent;
  let fixture: ComponentFixture<UpfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
