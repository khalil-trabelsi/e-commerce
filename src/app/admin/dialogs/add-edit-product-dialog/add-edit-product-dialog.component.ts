import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrandsService } from '../../services/brands.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../services/categories.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { forkJoin, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NotificationService } from '../../../helpers/notification.service';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-add-edit-product-dialog',
  templateUrl: './add-edit-product-dialog.component.html',
  styleUrl: './add-edit-product-dialog.component.scss'
})
export class AddEditProductDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  selectedImages!: FileList;
  selectedImageUrl: any[] = [];
  brands = toSignal(this.brandsService.getAllBrands(), {initialValue: []});
  categories = toSignal(this.categoriesService.getAllCategories(), {initialValue: []})
  collections = toSignal(this.collectionService.getCollections(), {initialValue: []})
  multiple = false;

  productFormGroup!: FormGroup;

  selectedCatgeoryId!: number;
  selectedBrandId!: number;
  selectedCollectionId!: number;

  selectedImagesName: string[] = []


  constructor(
    private dialgRef: MatDialogRef<AddEditProductDialogComponent>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private collectionService: CollectionService
  ) {}


  ngOnInit(): void {
      this.productFormGroup = this.fb.group(
        {
          name: this.fb.control(''),
          price_ht: this.fb.control(0),
          tva: this.fb.control(0),
          description: this.fb.control(''),
          main_image: this.fb.control(''),
          features: this.fb.array([])
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

  get main_image() {
    return this.productFormGroup.controls['main_image'];
  }

  get features(): FormArray {
    return this.productFormGroup.get("features") as FormArray
  }

  createFeature() {
    return this.fb.group(
      {label: ''}
    )
  }

  addFeature(): void {
    this.features.push(this.createFeature())
  }

  removeFeature(i: number) {
    this.features.removeAt(i);
  }

  getSelectedOptions(event: any) {
    if (event.type === "categories") {
      this.selectedCatgeoryId = event.selectedOptions;
    }

    if (event.type === "brands") {
      this.selectedBrandId = event.selectedOptions
    }

    if (event.type === "collections") {
      this.selectedCollectionId = event.selectedOptions
    }

  }

  private readFileAsDataUrl(file: any) {
    return new Observable((observer) => {
      let reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        observer.next(e.target?.result);
        observer.complete();
      }

      reader.onerror = () => {
        observer.error(`Error while reading file`)
      }

      reader.readAsDataURL(file)
    })
  }

  onFileSelected(event: any) {
    const inputElt = event.target as HTMLInputElement;
    if (inputElt?.files && inputElt.files.length > 0) {
      this.selectedImages = inputElt.files;
    }
    this.selectedImagesName = Array.from(this.selectedImages).map(img => img.name);
    
    const observables = Array.from(this.selectedImages).map(img => this.readFileAsDataUrl(img))

    forkJoin(observables).pipe(takeUntil(this.destroy$)).subscribe({
      next: (values) => {
        this.selectedImageUrl = values;
        console.log(values)
      },
      error: (err) => {
        console.error(err)
      }
    }) 
    
  }

  addProduct() {
    const product = {...this.productFormGroup.value, category_id: this.selectedCatgeoryId, brand_id: this.selectedBrandId, collection_id: this.selectedCollectionId}
    let formData = new FormData();

    
    for (let i = 0; i< this.selectedImages.length; i++) {
      formData.append('files', this.selectedImages[i], this.selectedImages[i].name)
    }

    formData.append('main_image', this.main_image.value)

    this.productsService.addProduct(
      product
    ).pipe(switchMap((product) => this.productsService.uploadImages(product.id, formData)),takeUntil(this.destroy$)).subscribe(
      res => { 
            console.log(res);
            this.productsService.refreshProducts();
            this.notificationService.notify('Product was added succsefully')
        this.dialgRef.close()
       }
    )
  }
 
  

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
