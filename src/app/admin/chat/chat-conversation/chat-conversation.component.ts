import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatWsService } from '../../../services/chat-ws.service';
import { UsersService } from '../../../services/users.service';
import { StorageService } from '../../../helpers/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddConversationDialogComponent } from '../../dialogs/add-conversation-dialog/add-conversation-dialog.component';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.scss'
})
export class ChatConversationComponent implements OnInit, AfterViewChecked, OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  inputMessage = ''
  senderId = this.storageService.getUser()?.id;
  receiverId!: string | null;
  receiver!: {id: any, email: string};
  chatId!: any;
  messages: any[] = [];
  chatSubject!: string;
  chat!: any; 

  
  constructor(
    public chatWS: ChatWsService,
    public userServices: UsersService,
    private storageService: StorageService,
    private activetedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.chatId = this.activetedRoute.snapshot.paramMap.get("id");
  }
  
  ngOnInit(): void {
    // this.activetedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe(
    //   value => this.chatId = value.get('id')
    // )

    this.chatWS.receivedMessage.subscribe(data => {
      console.log(data.chatId == this.chatId)
      console.log(this.chatId)
      console.log(data)
      if (data.chatId == this.chatId) {
        this.messages.push(data.message)
      }
    })
    
    this.chatWS.getChat(this.chatId).pipe(takeUntil(this.destroy$)).subscribe(
      chat => {
        console.log(chat)
        this.chat = chat;
        this.messages = chat.messages
        this.receiverId = chat.participants[0]["first_participant"] != this.senderId ? chat.participants[0]["first_participant"] : chat.participants[0]["second_participant"];
        this.receiver = chat.participants[0].first_user.id != this.senderId ? chat.participants[0]["first_user"] : chat.participants[0]["second_user"];
        this.chatSubject = chat.subject
      }
    )
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  scrollToBottom() {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
  sendMessage(e: Event) {
    e.preventDefault();
    if (!this.receiverId) return;
    const message = {
      sender_id: this.senderId,
      receiver_id: this.receiverId,
      content: this.inputMessage,
      chat_id: this.chatId
    }
    this.chatWS.sendMessage({...message})
    this.inputMessage = '';
    // this.messages.push({...message})
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
