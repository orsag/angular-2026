import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { VanService } from '@services/van-service';
import { VanVehicle } from '@types';
import { catchError, EMPTY, Observable } from 'rxjs';

const MESSAGE = 'Vozidlo s týmto ID neexistuje alebo nastala chyba pri načítaní.';

export const vanDetailResolver: ResolveFn<VanVehicle> = (
  route: ActivatedRouteSnapshot
): Observable<VanVehicle> => {
  const vanService = inject(VanService);
  const id = route.paramMap.get('id')!;
  const router = inject(Router);

  // Tento stream musí skončiť (complete), aby router vykreslil komponent
  return vanService.getVanById(+id).pipe(
    catchError((error) => {
      vanService.errorMessage.set(MESSAGE);
      // 2. Presmerujeme používateľa späť na zoznam
      router.navigate(['/van-search']);
      // 3. Vrátime EMPTY, aby router vedel, že navigácia na detail sa ruší
      return EMPTY;
    })
  );
};
