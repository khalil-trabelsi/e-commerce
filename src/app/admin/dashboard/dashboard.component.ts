import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  salesOverview!: any;

  totalSales!: number;
  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void { 
    this.dashboardService.getSalesStatistics().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      data => this.salesOverview = data
    )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
