import { Component, inject } from '@angular/core';
import { SharedData as SharedDataService } from '../Services/shared-data';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  // below code for services & DI
  private _sharedData = inject(SharedDataService);

  // rxResource automatically calls the stream on init
  userResource = rxResource({
    stream: () => this._sharedData.getUserData(),
  });

  dummyData: any;
  isEligible: boolean;
  apiData: any;
  constructor() {
    this.dummyData = this._sharedData.userData;

    this.isEligible = this._sharedData.isEligibleForSubscription();
  }

  // ngOnInit(): void {
  //   this.getData();
  // }
  // getData() {
  //   this._sharedData.getUserData().subscribe((res: any) => {
  //     this.apiData = res;
  //     console.log('donwloaded!');
  //   });
  // }

  // userData = {
  //   id : 1,
  //   name : 'John',
  //   username : 'john',
  //   email : 'john@gmail.com'
  // }
}
