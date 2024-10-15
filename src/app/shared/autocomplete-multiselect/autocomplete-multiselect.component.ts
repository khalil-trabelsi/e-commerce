import { Component, computed, EventEmitter, input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toSignal } from "@angular/core/rxjs-interop"
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-autocomplete-multiselect',
  templateUrl: './autocomplete-multiselect.component.html',
  styleUrl: './autocomplete-multiselect.component.scss'
})
export class AutocompleteMultiselectComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  type = input.required<string>()
  options = input.required<any[]>()
  key = input.required<string>()
  optionId = input.required<string>()
  label = input.required<string>();
  searchFormControl = new FormControl('');
  searchKey = toSignal(this.searchFormControl.valueChanges, {initialValue: ''});
  selectAll = new FormControl(false);
  selectedOptionsControl = new FormControl<any[]>([]);

  multiple = input.required<boolean>();

  toolTip: string = ''
  

  filteredOptions = computed(()=> {
    return this.options() && this.options().length > 0 ? this.options().filter(item => item[this.key()].toLowerCase().includes(this.searchKey()?.toLowerCase())) : []
  })

  @Output()
  selectedOptions = new EventEmitter()


  constructor() {}

  ngOnInit(): void {
    this.selectedOptionsControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data?.length === this.filteredOptions().length) {
          this.selectAll.setValue(true)
        } else {
          this.selectAll.setValue(false)
        }
        
        this.toolTip = this.filteredOptions().filter(item => this.selectedOptionsControl.value && this.selectedOptionsControl.value.includes(item[this.optionId()]) )
        .map(item => item[this.key()]).join(', ');
        
        this.selectedOptions.emit({selectedOptions: data, type: this.type()});
      }
      
    )
  }

  toggleSelectAll(event: boolean) {
    if (event) {
      this.selectedOptionsControl.setValue(this.filteredOptions().map(item => item[this.optionId()]));
    } else {
      this.selectedOptionsControl.setValue([]);
    }
  }

  clear() {
    this.searchFormControl.setValue('')
    if (this.selectedOptionsControl.value?.length === this.filteredOptions().length) {
      this.selectAll.setValue(true)
    } else {
      this.selectAll.setValue(false)
    }
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
