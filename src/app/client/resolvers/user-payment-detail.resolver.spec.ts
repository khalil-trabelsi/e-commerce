import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userPaymentDetailResolver } from './user-payment-detail.resolver';

describe('userPaymentDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userPaymentDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
