import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { SelectItems } from 'src/app/shared/types/types';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class SelectComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() itens: SelectItems[] = []

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onChangeSelect() {
    this.onChange.emit(this.control);
  }

  clearSelect() {
    this.control.setValue(null);
  }
}
