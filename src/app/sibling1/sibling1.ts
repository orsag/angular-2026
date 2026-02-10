import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sibling1',
  imports: [],
  templateUrl: './sibling1.html',
  styleUrl: './sibling1.scss',
})
export class Sibling1 {
  @Output() sigbling1Event = new EventEmitter<any>();
  @Input() sibling1Property: string = '';

  onSubmit(data: any) {
    this.sigbling1Event.emit(data);
  }
}
