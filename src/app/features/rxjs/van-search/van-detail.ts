import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { VanVehicle } from '@types';

@Component({
  selector: 'app-van-detail',
  standalone: true,
  template: `
    @if (van(); as v) {
      <div class="container mt-4">
        <h2>{{ v.brand }} {{ v.model }}</h2>
        <p>Kategória: {{ v.category }}</p>
      </div>
    }
  `
})
export class VanDetailComponent {
  private route = inject(ActivatedRoute);

  // Získame dáta z resolvera a premeníme ich na signál
  van = toSignal(
    this.route.data.pipe(map(data => data['van'] as VanVehicle))
  );
}
