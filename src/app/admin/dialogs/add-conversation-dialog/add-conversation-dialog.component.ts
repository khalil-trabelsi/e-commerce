import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-conversation-dialog',
  templateUrl: './add-conversation-dialog.component.html',
  styleUrl: './add-conversation-dialog.component.scss'
})
export class AddConversationDialogComponent implements OnInit {
  object = '';
  message = '';
  users: any[] = [];
  selectedUser = "";

  constructor(
    public dialogRef: MatDialogRef<AddConversationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
      this.users = this.data.users
  }


  addConversation() {
    this.dialogRef.close({subject: this.object, message: this.message, receiver_id: this.selectedUser})
  }

  cancel() {
    this.dialogRef.close(null)
  }

  getSelectedOptions(event: any) {
    this.selectedUser = event.selectedOptions[0]
  }

  
}
