import { Routes } from '@angular/router';
import { Address } from './features/home/address/address';
import { DataBinding } from './features/home/data-binding/data-binding';
import { AttributeDirectives } from './features/basics/attribute-directives/attribute-directives';
import { PageNotFound } from './features/core/page-not-found/page-not-found';
import { BuiltPipes } from './features/home/built-pipes/built-pipes';
import { TemplateDrivenForm } from './features/basics/template-driven-form/template-driven-form';
import { ReactiveForm } from './features/basics/reactive-form/reactive-form';
import { Profile } from './features/home/profile/profile';
import { AddUser } from './features/basics/add-user/add-user';
import { ResourceApi } from './features/basics/resource-api/resource-api';
import { Employees } from './features/basics/employees/employees';
import { Storage } from './features/basics/storage/storage';
import { SignalForms } from './features/signals/signal-forms/signal-forms';
import { ExpenseTracker } from './features/experimental/expense-tracker/expense-tracker';
import { Vehicles } from './features/signals/vehicles/vehicles';
import { UserSearch } from './features/experimental/user-search/user-search';
import { Structural } from './features/home/structural/structural';
import { AdminPage } from './features/core/admin-page/admin-page';
import { Dashboard } from './features/experimental/dashboard/dashboard';
import { UserDetails } from './features/experimental/user-details/user-details';
import { InfiniteScroll } from './features/experimental/infinite-scroll/infinite-scroll';
import { PhotoGallery } from './features/rxjs/photo-gallery/photo-gallery';
import { VanSearch } from './features/rxjs/van-search/van-search';
// ========================
import { authInterceptor } from './core/interceptors/auth-interceptor';
import {
  provideHttpClient,
  withInterceptors,
  withRequestsMadeViaParent,
} from '@angular/common/http';
import {vanDetailResolver} from './shared/resolvers/van-detail-resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: Profile },
  { path: 'data-binding', component: DataBinding },
  { path: 'structural', component: Structural },
  { path: 'attribute', component: AttributeDirectives },
  { path: 'built-in-pipes', component: BuiltPipes },
  { path: 'tdf', component: TemplateDrivenForm },
  { path: 'rf', component: ReactiveForm },
  { path: 'add-user', component: AddUser },
  { path: 'resource-api', component: ResourceApi },
  { path: 'storage', component: Storage },
  { path: 'signal-forms', component: SignalForms },
  { path: 'employees', component: Employees },
  { path: 'address', component: Address },
  { path: 'expense-tracker', component: ExpenseTracker },
  { path: 'vehicles', component: Vehicles },
  { path: 'user-search', component: UserSearch },
  { path: 'dashboard', component: Dashboard },
  { path: 'user-details', component: UserDetails },
  { path: 'infinite-scroll', component: InfiniteScroll },
  { path: 'photo-gallery', component: PhotoGallery },
  { path: 'van-search', component: VanSearch },
  {
    path: 'admin',
    component: AdminPage,
    providers: [
      provideHttpClient(withInterceptors([authInterceptor]), withRequestsMadeViaParent()),
    ],
  },
  {
    path: 'van-search/:id',
    loadComponent: () => import('./features/rxjs/van-search/van-detail').then(m => m.VanDetailComponent),
    resolve: {
      van: vanDetailResolver // Dáta budú dostupné pod kľúčom 'van'
    }
  },
  { path: '**', component: PageNotFound },
];
