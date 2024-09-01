import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = signal(false);

  constructor() { }

  setLoading(value: boolean): void {
    this.loading.set(value) ;
  }

}
