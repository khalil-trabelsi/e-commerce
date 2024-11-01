import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../admin/services/categories.service';
import { ClientService } from '../services/client.service';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../services/cart.service';
import { StorageService } from '../../helpers/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  multiple = true;
  categories = toSignal(this.categoriesService.getAllCategories(), {initialValue: []})
  categoriesAggregated: any[] = []

  showSubMenu = false;
  cartItemsNumber = this.cartService.cartItemsTotal;

  isLoggedIn = this.storageService.isLoggedIn()

  constructor(
    private categoriesService: CategoriesService,
    private clientService: ClientService,
    private cartService: CartService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
      this.clientService.getCategoryAggregated().pipe(takeUntil(this.destroy$)).subscribe(
        data => {
          this.categoriesAggregated = data.filter(item => !item.parent_id);
          console.log(this.categoriesAggregated)
        }
      )
  }

  getSelectedOptions(event: any) {

  }


  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  onMouseEnter() {
    this.showSubMenu = true;
  }

  
  onMouseLeave() {
    this.showSubMenu = false;
  }

}
