import { Routes } from '@angular/router';
import { User } from './user/user';
import { DataBinding } from './data-binding/data-binding';
import { StructuralIf } from './structural-if/structural-if';
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
// import { ReusableComponent } from './reusable/reusable.component';
import { Storage } from './storage/storage';
import { SignalForms } from './signal-forms/signal-forms';
import { SignalStore } from './signal-store/signal-store';

export const routes: Routes = [
  //   { path: '', component: UserComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: User },
  { path: 'profile', component: Profile },
  { path: 'data-binding', component: DataBinding },
  { path: 'structural-directive', component: StructuralIf },
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
  { path: 'signalstore', component: SignalStore },
  { path: '**', component: PageNotFound },
];
