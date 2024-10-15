import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrl: './confirmation-email.component.scss'
})
export class ConfirmationEmailComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          console.log(params.get('token'))
          return this.authService.confirmMail(params.get('token')!)
        })
      ).subscribe(
        data => console.log(data)
      )
  }
}
