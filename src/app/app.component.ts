import { Component } from '@angular/core';
import { LoadingService } from './helpers/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce';

  constructor(public loadingService: LoadingService) {}
}
