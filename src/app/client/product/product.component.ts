import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../admin/services/products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

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


  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getProductById(params.get('id')!)
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

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
