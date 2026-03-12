import { Component, inject } from '@angular/core';
import { SharedData as SharedDataService } from '../Services/shared-data';
import { CommonModule, JsonPipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, JsonPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  // below code for services & DI
  private dataService = inject(SharedDataService);

  // rxResource automatically calls the stream on init
  userResource = rxResource({
    stream: () => this.dataService.getUserData(),
  });

  dummyData: any;
  constructor() {
    this.dummyData = this.dataService.userData;
  }

  // users$ = this._sharedData.getUserData(); WORSE
  // declarative data access patern
  users$ = this.dataService.users$;

  filteredUsers$ = this.dataService.filteredUsers$;

  usersNames$ = this.users$.pipe(map((users) => users.map((user) => user.username)));

  // selected user
  selectedUser$ = this.dataService.selectedUser$;

  onChange(category: string) {
    this.dataService.selectedCategoryChange(parseInt(category));
  }
}
