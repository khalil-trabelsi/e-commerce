import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { io, Socket } from 'socket.io-client';
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
  queue: any[] = []

  apiUrl = environment.apiUrl;
  private socket!: Socket | null | undefined;

  constructor(
    private ngZone: NgZone,
    private store: Store<AppState>,
    private httpClient: HttpClient
    

  ) { 
    this.getSession()
  }

  addToQueue(data: {event: string, payload: any[]}) {
    this.queue.push(data)
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
        if (!this.socket?.connected) {
          this.reconnect();
        }  
      })
      this.socket.on('reconnect_attempt', (attempt: any) => {
        console.log('reconnecting attempt ' + attempt)
        if (!this.socket?.active) {
          console.log(this.socket?.active)
          console.log('Trying to reconnect...')
          this.reconnect();
        }  
      })
  
      this.socket.on('connect_error', (err: any) => {
      });
      
      this.socket.onAny((eventName, ...args) => {
      console.log(`DEBUG - Event received: ${eventName}`, args);
      });
   
      this.socket.on('new_order', (newOrder: any) => {
        console.log('New order created')
        console.log(newOrder)
        this.ngZone.run(() => {
          console.log('New order created', 'success');
          this.store.dispatch(new OrderModule.SuccessCreateOrder(newOrder));
        })
      });
    }

  }


  emitMessage() {
    this.socket?.emit('test')
  }

  public reconnect() {
    console.log('reconnect')
    if (this.socket) {
      console.log('Destroying socketio connection');
      this.socket.io.off('close');
      this.socket.io.off('open')
      this.socket.io.off('reconnect')
      this.socket.io.off('reconnect_attempt')
      this.socket.disconnect();
      this.socket = null;
    }
    this.getSession()
  }

  getSession() {
    console.log('connecting to socket...')
    this.socket = io(`${environment.apiUrl}/admin`, {
      transports: ['websocket'],
    });
    console.log(this.socket)
    this.setupConnectionHandlers()
  }

  ngOnDestroy(): void {
    console.log('destroying service')
    this.destroy$.next();
    this.destroy$.complete();
  }

}
