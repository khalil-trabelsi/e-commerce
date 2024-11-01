import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ToastrService } from '../toastr/toastr.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { OrderModule } from '../store/actions/order.action';
import { StorageService } from '../helpers/storage.service';

@Injectable({
  providedIn: 'root' 
})
export class SocketSessionIOService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private connectedSubject = new BehaviorSubject(false);
  connected$ = this.connectedSubject.asObservable();

  apiUrl = environment.apiUrl;
  private socket!: Socket | null | undefined;

  constructor(
    private ngZone: NgZone,
    private toastrService: ToastrService,
    private store: Store<AppState>,
    private storageService: StorageService
    

  ) { 
    this.intializeWSConnection();
    this.setupConnectionHandlers()

  }
  setupConnectionHandlers() {
    if (this.socket) {
      console.log('Starting websocket service')
      this.socket.on('connect', () => {
        console.log(`Connected with id ${this.socket?.id}`)
        this.connectedSubject.next(true)
      })
  
      this.socket?.on('disconnect', () => {
        console.log('disconnecting')
      })


      this.socket.on('reconnect', (attempt: any) => {
        console.log('reconnecting attempy ' + attempt)
      })
  
      this.socket.on('connect_error', (reason: any) => {
        console.error('Socket connection error:', reason);
        if (!this.socket?.active) {
          console.log('Trying to reconnect...')
          this.reconnect();
        }
      });
      
      this.socket.onAny((eventName, ...args) => {
      console.log(`DEBUG - Event received: ${eventName}`, args);
      });

      this.socket.on('new_order', (newOrder: any) => {
        console.log('New order created')
        console.log(newOrder)
        this.ngZone.run(() => {
          this.toastrService.openToastr('New order created', 'success');
          this.store.dispatch(new OrderModule.SuccessCreateOrder(newOrder));
        })
      });
    }

  }
  intializeWSConnection() {
    const jwt = this.storageService.getToken();
    this.socket = io(`${environment.apiUrl}/admin`, {
      forceNew: false,
      transports: ['websocket'],
      multiplex: true,
      reconnection: true,
      reconnectionAttempts: 5,
      upgrade: true,
      auth: {
        token: jwt,
        userId: this.storageService.getUser().id
      }
    });
  }

  emitMessage() {
    this.socket?.emit('test')
  }

  disconnect() {
    if (this.socket) {
      this.socket.off('connect');
      this.socket.off('disconnect');
      this.socket.disconnect();   
      this.connectedSubject.next(false)
     }
  }

  public reconnect() {
    if (this.socket) {
      console.log('Destroying socketio connection');
      // this.socket.io.off()
      
    }

    this.intializeWSConnection();
  }

  ngOnDestroy(): void {
    console.log('destroying service')
    this.destroy$.next();
    this.destroy$.complete();
    this.disconnect()
  }

}
