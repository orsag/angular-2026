import { Component, input, output } from '@angular/core';
import { VanVehicle } from '@types';

@Component({
  selector: 'app-van-detail-modal',
  template: `
    <div class="modal" tabindex="-1" id="exampleModal" (click)="close.emit()">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ value().brand }} {{ value().model }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" (click)="close.emit()"></button>
          </div>
          <div class="modal-body">
            <p><strong>Kategória:</strong> {{ value().category }}</p>
            <p><strong>Objem nákladu:</strong> {{ value().cargoCapacity }} L</p>
            <p><strong>Počet sedadiel:</strong> {{ value().seats }}</p>
            @if (value().year) {
              <p><strong>Rok výroby:</strong> {{ value().year }}</p>
            }
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" (click)="close.emit()">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: block; /* Toto je kľúčové - Bootstrap ho inak skrýva */
      background: rgba(0, 0, 0, 0.5); /* Tmavé pozadie okolo modalu */
    }
    .modal-dialog {
      margin-top: 10%; /* Aby nebol úplne nalepený hore */
    }
  `],
})
export class VanDetailModal {
  // Moderný spôsob cez input() funkciu (Signal-based input)
  value = input.required<VanVehicle>();

  // Event na zatvorenie
  close = output<void>();
}
