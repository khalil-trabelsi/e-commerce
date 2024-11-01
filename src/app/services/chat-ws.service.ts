import { Injectable, signal, WritableSignal } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment.development';
import { StorageService } from '../helpers/storage.service';
import { fromEvent, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ChatMessage {
  content: string,
  sender_id: any,
  receiver_id: any,
  timestamp?: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatWsService {

  private socket!: any;
  connectedUsers: WritableSignal<any[]> = signal([])
  messages: WritableSignal<ChatMessage[]> = signal([])
  numConnectedUsers = signal(0)

  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient
  ) {
    this.initializeWS();
    this.onConnectedUser().subscribe(
        (users) => this.connectedUsers.set(users)
    )
    this.onReceivedMessage().subscribe(
        (message) =>  this.updateMessages(message)
        ) 
  }

  updateMessages(newMessage: any) {
    this.messages.update(messages => [...messages, newMessage].sort((a, b)=>  a.timestamp && b.timestamp ?  a.timestamp.localeCompare(b.timestamp) : 0))
  }

  initializeWS() {
     this.socket = io(`${environment.apiUrl}/chat`, {
          transports: ['websocket'],
          auth: {
            userId: this.storageService.getUser()?.id
          },
          reconnection: true

        });
     this.handleEvents()

  }

  
  handleEvents() {
    this.socket.on('connect', () => {
      console.log('Connected into chat! '+this.socket.id)
    });
    this.socket.on('connected_users', (num: any) => {
      console.log(`Connected users: ${num}`)
        this.numConnectedUsers.set(num)
      })

   }

   onConnectedUser() {
    return fromEvent(this.socket, 'connected_user') as Observable<any>;
   }
   onReceivedMessage() {
    return fromEvent(this.socket, 'message_received') as Observable<ChatMessage>;
   }

   onConnect() {
    return fromEvent(this.socket, 'connect') as Observable<any>
   }

   sendMessage(payload: {content: string, sender_id: any, receiver_id: any, chat_id: any}) {
    this.socket.emit('new_message', payload)
   }

   clearMessages() {
    this.messages.set([]);
   }


   createChat(participants: Array<number>): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/chat`, participants).pipe(tap(chat => {
      console.log(chat);
      this.messages.set(chat.messages.sort((a: any, b: any)=>  a.timestamp && b.timestamp ?  a.timestamp.localeCompare(b.timestamp) : 0))
    }))
   }
}
