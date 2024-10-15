import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationEmailNotificationComponent } from './confirmation-email-notification.component';

describe('ConfirmationEmailNotificationComponent', () => {
  let component: ConfirmationEmailNotificationComponent;
  let fixture: ComponentFixture<ConfirmationEmailNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationEmailNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationEmailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
