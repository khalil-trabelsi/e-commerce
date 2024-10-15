import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrandsService } from '../../services/brands.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../../helpers/notification.service';

@Component({
  selector: 'app-add-edit-product-dialog',
  templateUrl: './add-edit-product-dialog.component.html',
  styleUrl: './add-edit-product-dialog.component.scss'
})
export class AddEditProductDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  selectedImages!: FileList;
  brands = toSignal(this.brandsService.getAllBrands(), {initialValue: []});
  categories = toSignal(this.categoriesService.getAllCategories(), {initialValue: []})
  multiple = false;

  productFormGroup!: FormGroup;

  selectedCatgeoryId!: number;
  selectedBrandId!: number;

  selectedImagesName: string[] = []


  constructor(
    private dialgRef: MatDialogRef<AddEditProductDialogComponent>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}


  ngOnInit(): void {
      this.productFormGroup = this.fb.group(
        {
          name: this.fb.control(''),
          price_ht: this.fb.control(0),
          tva: this.fb.control(0),
          description: this.fb.control('')
        }
      )
  }

  get name() {
    return this.productFormGroup.controls['name'];
  }

  get price_ht() {
    return this.productFormGroup.controls['price_ht'];
  }

  get tva() {
    return this.productFormGroup.controls['tva'];
  }
  
  get description() {
    return this.productFormGroup.controls['description'];
  }

  getSelectedOptions(event: any) {
    if (event.type === "categories") {
      this.selectedCatgeoryId = event.selectedOptions;
    }

    if (event.type === "brands") {
      this.selectedBrandId = event.selectedOptions
    }
  }


  onFileSelected(event: Event) {
    const inputElt = event.target as HTMLInputElement;
    if (inputElt?.files && inputElt.files.length > 0) {
      this.selectedImages = inputElt.files;
    }
    this.selectedImagesName = Array.from(this.selectedImages).map(img => img.name)
  }

  addProduct() {
    const product = {...this.productFormGroup.value, category_id: this.selectedCatgeoryId, brand_id: this.selectedBrandId}
    let formData = new FormData();
    
    for (let i = 0; i< this.selectedImages.length; i++) {
      formData.append('files', this.selectedImages[i], this.selectedImages[i].name)
    }

    this.productsService.addProduct(
      product
    ).pipe(takeUntil(this.destroy$)).subscribe(
      product => { 
        this.productsService.uploadImages(product.id, formData)
        .pipe(takeUntil(this.destroy$)).subscribe(
          res => {
            console.log(res);
            this.productsService.refreshProducts();
            this.notificationService.notify('Product was added succsefully')
          }
        );
        this.dialgRef.close()
       }
    )
  }
 

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
