import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { ChatWsService } from '../../services/chat-ws.service';
import { UsersService } from '../../services/users.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '../../helpers/storage.service';
import { map, pipe, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  users: User[] = [];
  filteredUsers: User[] = [];
  inputMessage = ''
  senderId = this.storageService.getUser()?.id;
  receiverId= new FormControl('')
  messages: any[] = [{'senderId': 82, 'receiverId': 116, 'content': 'Ok fuck you !!'}, {'senderId': 116, 'receiverId': 82, 'content': 'merci !!'}];
  form: FormGroup = new FormGroup({
    receiverId: this.receiverId
  })
  userSearch: string = '';

  constructor(
    public chatWS: ChatWsService,
    public userServices: UsersService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.userServices.getAllUsers().pipe(takeUntil(this.destroy$)).subscribe(
        users => {
          this.users = users.filter(user => user.id != this.senderId);
          this.filteredUsers = this.users
        }
      )
  }

  startConversation(receiverId?: number) {
    this.chatWS.createChat([this.senderId, receiverId]).pipe(takeUntil(this.destroy$)).subscribe(
      chat => {
       this.router.navigateByUrl(`admin/chat/${chat.id}?receiverId=${receiverId}`)
      }
    )
  }

  filterUsers(event: Event) {
    this.filteredUsers = this.users.filter(user => 
      user.email?.includes(this.userSearch) || 
      user.first_name?.includes(this.userSearch) ||
      user.last_name?.includes(this.userSearch) ||
      user.username?.includes(this.userSearch)
    )
    console.log(this.filteredUsers)
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
