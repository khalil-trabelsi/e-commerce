import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGridActionComponent } from './custom-grid-action.component';

describe('CustomGridActionComponent', () => {
  let component: CustomGridActionComponent;
  let fixture: ComponentFixture<CustomGridActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomGridActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
