import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { ChatWsService } from '../../services/chat-ws.service';
import { UsersService } from '../../services/users.service';
import { StorageService } from '../../helpers/storage.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { CustomerOrderService } from '../../services/customer-order.service';
import { MatDialog } from '@angular/material/dialog';
import { AddConversationDialogComponent } from '../dialogs/add-conversation-dialog/add-conversation-dialog.component';
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
  receiverId: any;
  userSearch: string = '';
  orders: any[] = []
  chatHistory!: any;

  constructor(
    public chatWS: ChatWsService,
    public userServices: UsersService,
    private storageService: StorageService,
    private router: Router,
    private customerOrderService: CustomerOrderService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.userServices.getAllUsers().pipe(takeUntil(this.destroy$)).subscribe(
        users => {
          this.users = users.filter(user => user.id != this.senderId);
          this.filteredUsers = this.users
        }
      )
      this.customerOrderService.getAllOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        orders => this.orders = orders
      )
      this.loadChatHistory()
  }

  loadChatHistory(page = 1) {
    this.chatWS.getAllChats(page).pipe(takeUntil(this.destroy$))
      .subscribe(history => this.chatHistory = history)
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

  getSelectedOptions(event: any) {
    console.log(event)
  }

  openNewConversationDialog() {
    const ref = this.matDialog.open(AddConversationDialogComponent, {
      width: '45vw',
      data: {
        users: this.users
      }
    })

    ref.afterClosed().pipe(
      takeUntil(this.destroy$), 
      filter(result => result),
      switchMap(result => this.chatWS.createChat(
        {subject: result.subject, message: result.message, participants: [ this.senderId, result.receiver_id] }
      ))
    ).subscribe(
      _ => {
        this.loadChatHistory()
      }
    )    
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
