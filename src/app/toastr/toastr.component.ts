import { Component, HostBinding, Input } from '@angular/core';
import { ToastrType } from '../models/toastrType';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('200ms ease-out'),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ]),
    ])
  ]
})
export class ToastrComponent {

  @Input() message: String = '';
  @Input() type!: ToastrType;

  @HostBinding('@fadeInOut') fade = true;

}
