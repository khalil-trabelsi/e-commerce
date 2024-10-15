import { Component, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SuppliersService } from '../../services/suppliers.service';
import { ProductsService } from '../../services/products.service';
import { StockMovementsService } from '../../services/stock-movements.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../../helpers/notification.service';

@Component({
  selector: 'app-add-edit-stock-entry',
  templateUrl: './add-edit-stock-entry.component.html',
  styleUrl: './add-edit-stock-entry.component.scss'
})
export class AddEditStockEntryComponent implements OnDestroy {

  private destroy$ = new Subject<void>()

  multiple = false;
  
  selectedSupplierId = 0;
  selectedProductId = 0;
  quantityControl = new FormControl(0);
  commentControl = new FormControl('');
  referenceControl = new FormControl('');

  suppliers = toSignal(this.suppliersService.getSuppliers(), {initialValue: []})
  products = toSignal(this.productsService.getProducts(), {initialValue: []})

  constructor(
    private dialogRef: MatDialogRef<AddEditStockEntryComponent>,
    private fb: FormBuilder,
    private suppliersService: SuppliersService,
    private productsService: ProductsService,
    private stockMovementsService: StockMovementsService,
    private notificationService: NotificationService
  ) {}

  getSelectedOptions(result: {selectedOptions: number, type: string}) {

    switch(result.type) {
      case 'suppliers': {
        this.selectedSupplierId = result.selectedOptions;
        break;
      };

      case 'products': {
        this.selectedProductId = result.selectedOptions;
        break;
      }

      default: break;

    }
  }

  addStockEntry() {
    const request = {
      product_id: this.selectedProductId,
      supplier_id: this.selectedSupplierId,
      quantity: this.quantityControl.value,
      comment: this.commentControl.value,
      movement_type: 'entry',
      reference: this.referenceControl.value
    }
    this.stockMovementsService.addStockEntry(request)
    .pipe(takeUntil(this.destroy$)).subscribe(
      entry => {
        this.notificationService.notify(`Entry with #id ${entry.id} was successfully added`);
        this.stockMovementsService.refreshStockMovements();
        this.dialogRef.close(true);
      }
    )
  }


  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
