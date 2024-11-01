import { Component, Input, OnInit } from '@angular/core';
import { ChatWsService } from '../../../services/chat-ws.service';
import { UsersService } from '../../../services/users.service';
import { StorageService } from '../../../helpers/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.scss'
})
export class ChatConversationComponent implements OnInit {

  inputMessage = ''
  senderId = this.storageService.getUser()?.id;
  receiverId!: string | null;
  chatId!: any;
  messages: any[] = [{'senderId': 82, 'receiverId': 116, 'content': 'Ok fuck you !!'}, {'senderId': 116, 'receiverId': 82, 'content': 'merci !!'}];

  
  constructor(
    public chatWS: ChatWsService,
    public userServices: UsersService,
    private storageService: StorageService,
    private activetedRoute: ActivatedRoute
  ) {
        console.log(this.activetedRoute.snapshot.paramMap.get('receiverId'))
      
  }
  
  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe(
      value => this.chatId = value.get('id')
    )
    this.activetedRoute.queryParamMap.subscribe(
      params => this.receiverId = params.get('receiverId')
    )
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
  }

}
