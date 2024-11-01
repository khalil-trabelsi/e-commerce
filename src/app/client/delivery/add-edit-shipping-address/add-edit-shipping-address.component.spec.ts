import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditShippingAddressComponent } from './add-edit-shipping-address.component';

describe('AddEditShippingAddressComponent', () => {
  let component: AddEditShippingAddressComponent;
  let fixture: ComponentFixture<AddEditShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditShippingAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
