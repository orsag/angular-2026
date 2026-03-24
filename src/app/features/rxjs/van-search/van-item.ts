import { Component, input } from '@angular/core';
import { VanVehicle } from '@types';

@Component({
  standalone: true,
  selector: 'app-standard-van-item',
  template: `
    <div class="d-flex justify-content-between align-items-center w-100">
      <div>
        <h6 class="mb-0 fw-bold">{{ data().brand }} {{ data().model }}</h6>
        <small class="text-muted">Standard Fleet</small>
      </div>
      <span class="badge bg-secondary rounded-pill">{{ data().category }}</span>
    </div>
  `,
  host: {
    'class': 'd-block w-100'
  }
})
export class StandardVanItem {
  data = input.required<VanVehicle>();
}

@Component({
  standalone: true,
  selector: 'app-luxury-van-item',
  template: `
    <div
      class="d-flex justify-content-between align-items-center w-100 border-start border-4 border-warning ps-3"
    >
      <div>
        <h6 class="mb-0 fw-bold text-primary">{{ data().brand }} {{ data().model }}</h6>
        <small class="text-warning"><i class="bi bi-star-fill"></i> Premium Selection</small>
      </div>
      <span class="badge bg-warning text-dark rounded-pill">{{ data().category }}</span>
    </div>
  `,
  host: {
    'class': 'd-block w-100'
  }
})
export class LuxuryVanItem {
  data = input.required<VanVehicle>();
}
