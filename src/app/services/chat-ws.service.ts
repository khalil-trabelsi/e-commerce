import { Injectable, NgZone, signal, WritableSignal } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment.development';
import { StorageService } from '../helpers/storage.service';
import { fromEvent, map, Observable, Subject, tap, timestamp } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DateFormattingService } from '../helpers/date-formatting.service';

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
  numConnectedUsers = signal(0);
  receivedMessage = new Subject<any>();

  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient,
    private dateFormattingService: DateFormattingService,
    private ngZone: NgZone
  ) {
    this.initializeWS();

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
      
    this.socket.on('message_received', (data: any ) => {
      console.log(data)
      this.receivedMessage.next(data)
    })  

   }

   onConnectedUser() {
    return fromEvent(this.socket, 'connected_user') as Observable<any>;
   }


   sendMessage(payload: {content: string, sender_id: any, receiver_id: any, chat_id: any}) {
    this.socket.emit('new_message', payload)
   }

   clearMessages() {
    this.messages.set([]);
   }


   createChat(payload: {subject: string, message: string, participants: any[]}): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/chatroom/chat`, payload).pipe(tap(chat => {
      console.log(chat);
      this.messages.set(chat.messages.sort((a: any, b: any)=>  a.timestamp && b.timestamp ?  a.timestamp.localeCompare(b.timestamp) : 0))
    }))
   }


   createChatRoom(participants: Array<number>) {
    return this.httpClient.post<any>(`${environment.apiUrl}/chatroom`, participants).pipe(
      tap(chat => {
        console.log(chat);
    }))
   }

   getAllChats(page = 1): Observable<any[]> {
    const options = {
      params: new HttpParams().set('page', page)
    }
    return this.httpClient.get<any[]>(`${environment.apiUrl}/chatroom/chat`, options);
   }

   getChat(id: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/chatroom/chat/${id}`).pipe(
      map(chat => {
        return {
          ...chat,
          messages: chat.messages.sort((a: any, b: any)=>  a.timestamp && b.timestamp ?  a.timestamp.localeCompare(b.timestamp) : 0) 
        }
      })
    )
   }
}
