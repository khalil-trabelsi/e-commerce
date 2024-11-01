import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../admin/services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss'
})
export class ProductReviewsComponent implements OnInit{

  productId = input(0)
  productService = inject(ProductsService)

  productReviews = signal(<any>[])

  constructor() {
  }

  ngOnInit(): void {
      this.getProductReviews()
  }

  getProductReviews() {
    this.productService.getProductReviews(this.productId()).subscribe(
      data => this.productReviews.set(data)
    )
  }


}
