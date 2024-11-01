import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../admin/services/products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddProductReviewDialogComponent } from './add-product-review-dialog/add-product-review-dialog.component';
import { NotificationService } from '../../helpers/notification.service';
import { CartService } from '../services/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  product!: any;
  selectedImage!: string;
  selectedImageIndex = 0;
  productId!: number;

  quantity = new FormControl(1)


  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.productId = Number(params.get('id'))
        return  this.productService.getProductById(this.productId);
      }
      ),
      takeUntil(this.destroy$)
    ).subscribe(
      data => {
        this.product = data;
        this.selectedImage = this.product.images[0].image_url;
      }
    );
  }

  selectProductImage(imageIndex: number) {
    this.selectedImageIndex = imageIndex;
    this.selectedImage = this.product.images[imageIndex].image_url;
  }

  openAddProductReviewDialog(): void {
    console.log(this.product.images.filter((img: any) => img.main_image))
    const dialogRef = this.dialog.open(
      AddProductReviewDialogComponent,
      {
        width: '56vw',
        data: {
          productId: this.productId,
          image: this.product.images.filter((img: any) => img.main_image)[0].image_url || '',
          productName: this.product.name
        }
      }
    )

    dialogRef.afterClosed().pipe(filter(productReview => productReview),
    switchMap( productReviw => 
      this.productService.addProductReview(this.productId, productReviw)),
      takeUntil(this.destroy$)).subscribe(
        result => {
          this.notificationService.notify('Merci pour votre commentaire!');
          
        }
      )
  }

  addToCart() {
    this.cartService.addToCart({product: this.product, quantity: this.quantity.value!})
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
