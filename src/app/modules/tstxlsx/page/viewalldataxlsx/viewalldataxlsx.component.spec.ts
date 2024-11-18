import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewalldataxlsxComponent } from './viewalldataxlsx.component';

describe('ViewalldataxlsxComponent', () => {
  let component: ViewalldataxlsxComponent;
  let fixture: ComponentFixture<ViewalldataxlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewalldataxlsxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewalldataxlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
