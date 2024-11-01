import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../helpers/storage.service';
import { SocketSessionIOService } from '../services/socket-session-io.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  username = ''
  showHideSideBar = signal(false);

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private socketSessionService: SocketSessionIOService
  ) {}

  logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
      this.username = this.storageService.getCurrentUsername();
      this.socketSessionService.connected$.pipe(takeUntil(this.destroy$)).subscribe(
        (message) => {
          console.log('connected ' + message)
        }
      )
      this.socketSessionService.emitMessage()
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  toggleSidebarMenu() {
    this.showHideSideBar.update(
      currentValue => !currentValue
    )
  }
}
