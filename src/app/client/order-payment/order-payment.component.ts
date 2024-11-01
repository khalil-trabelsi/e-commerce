import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { CustomerOrderService } from '../../services/customer-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ToastrService } from '../../toastr/toastr.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.scss'
})
export class OrderPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>();

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  @ViewChild(StripeElementsDirective) elements!: StripeElementsDirective;


  clientService = inject(ClientService);
  customerOrderService = inject(CustomerOrderService)
  router = inject(Router);
  toastrService = inject(ToastrService)

  private readonly fb = inject(FormBuilder);
  

  userPaymentDetails: any;

  elementsOptions: StripeElementsOptions = {
    locale: 'fr',
    appearance: {
      theme: 'flat'
    },
    clientSecret: 'sk_test_51QI7E4JZ5ktRnjegNl0dxFMhtPjy8FZL5c7xtdignKiywYtUJEcJGoaRY9DduO2vZW7vuJlyLR0fz9YXoKIHr2Bc0005flJm1X'
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.elementsOptions.clientSecret = this.route.snapshot.paramMap.get('id')?.slice(1) ?? ''
    console.log(this.route.snapshot.paramMap.get('id') )
    this.route.data.subscribe(data => {
      const userDetail = data['userDetail'];
      this.userPaymentDetails = userDetail;
      console.log(userDetail)
    })
  }

  ngAfterViewInit(): void {
  }

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };


  stripe = injectStripe();
  paying = signal(false);

  pay() {
    this.paying.set(true);

    const {
      street,
      postal,
      country,
      city
    } = this.userPaymentDetails['shippingAddress'];
    const name = this.userPaymentDetails.username;
    const email = this.userPaymentDetails.email;

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: street as string,
                postal_code: postal as string,
                city: city as string,
                country: country as string
              }
            }
          },
          return_url: 'http://localhost:4200'
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.error(result.error)
          this.toastrService.openToastr('Paiement Échoué ! ', 'error')
          if (result.error.type == 'invalid_request_error')
          this.router.navigateByUrl(('/'))
    
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            this.toastrService.openToastr('Paiement Réussi ! ', 'success')
            this.router.navigateByUrl('/account/orders')

          }
        }
      });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}

