import { Routes } from '@angular/router';
import { Address } from './address/address';
import { DataBinding } from './data-binding/data-binding';
import { AttributeDirectives } from './attribute-directives/attribute-directives';
import { PageNotFound } from './page-not-found/page-not-found';
import { BuiltPipes } from './built-pipes/built-pipes';
import { TemplateDrivenForm } from './template-driven-form/template-driven-form';
import { ReactiveForm } from './reactive-form/reactive-form';
import { Profile } from './profile/profile';
import { Crud } from './crud/crud';
import { AddUser } from './add-user/add-user';
import { UpdateUser } from './update-user/update-user';
import { ViewUser } from './view-user/view-user';
import { ResourceApi } from './resource-api/resource-api';
import { Parent } from './parent/parent';
import { Employees } from './employees/employees';
// import { ReusableComponent } from './reusable/reusable.component';
import { Storage } from './storage/storage';
import { SignalForms } from './signal-forms/signal-forms';
import { ExpenseTracker } from './expense-tracker/expense-tracker';
import { Vehicles } from './vehicles/vehicles';
import { UserSearch } from './user-search/user-search';
import { Structural } from './structural/structural';
import {
  provideHttpClient,
  withInterceptors,
  withRequestsMadeViaParent,
} from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';
import { AdminPage } from './admin-page/admin-page';
import {Dashboard} from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: Profile },
  { path: 'data-binding', component: DataBinding },
  { path: 'structural', component: Structural },
  { path: 'attribute-directive', component: AttributeDirectives },
  { path: 'built-in-pipes', component: BuiltPipes },
  { path: 'tdf', component: TemplateDrivenForm },
  { path: 'rf', component: ReactiveForm },
  { path: 'crud', component: Crud },
  { path: 'adduser', component: AddUser },
  { path: 'updateuser/:id', component: UpdateUser },
  { path: 'viewuser/:id', component: ViewUser },
  { path: 'resourceapi', component: ResourceApi },
  // { path: 'reusable', component: ReusableComponent },
  { path: 'parent', component: Parent },
  { path: 'storage', component: Storage },
  { path: 'signalforms', component: SignalForms },
  { path: 'employees', component: Employees },
  { path: 'address', component: Address },
  { path: 'tracker', component: ExpenseTracker },
  { path: 'vehicles', component: Vehicles },
  { path: 'users', component: UserSearch },
  { path: 'dashboard', component: Dashboard },
  {
    path: 'admin',
    component: AdminPage,
    providers: [
      provideHttpClient(withInterceptors([authInterceptor]), withRequestsMadeViaParent()),
    ],
  },
  { path: '**', component: PageNotFound },
];
