import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormattingService {

  constructor() { }


  formatDateToTimestampString(date: Date) {
    return formatDate(date, 'yyyy-MM-dd/hh-mm-ss', 'en-US')
  }

  
  formatDateToYYMMDD(date: any) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
  }
}
