import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { SharedData as SharedDataService } from '../Services/shared-data';
import { rxResource } from '@angular/core/rxjs-interop';

type EmployeeStoreState = {
  refreshTrigger: number,
  theme: 'dark' | 'light';
  mode: 'view' | 'edit';
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: EmployeeStoreState = {
  refreshTrigger: 0,
  theme: 'light',
  mode: 'view',
  filter: { query: '', order: 'asc' },
};

export const EmployeeStoreStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store, dataService = inject(SharedDataService)) => {
    // 1. Define the resource ONCE here.
    // It starts fetching as soon as the store is initialized.
    const employeesResource = rxResource({
      stream: () => {
        // Access the signal here.
        // Whenever refreshTrigger changes, this function re-runs!
        store.refreshTrigger();
        return dataService.getUserData();
      },
    });

    return {
      employees: employeesResource.value,
      isLoading: employeesResource.isLoading,
      error: employeesResource.error,
      counter: computed(() => employeesResource.value()?.length),
    };
  }),

  withMethods((store) => ({
    // 3. Now the refresh method just tells the resource to reload
    refreshEmployees() {
      patchState(store, (state) => ({
        refreshTrigger: state.refreshTrigger + 1
      }));
    },
  })),
);
