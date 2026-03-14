import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
// import { SharedDataService } from '../Services/shared-data.service';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
})
export class DataBinding {
  // dummyData : any;
  // isEligible : boolean;
  // constructor(private _sharedData : SharedDataService){
  //   this.dummyData = this._sharedData.userData;
  //   this.isEligible = this._sharedData.isEligibleForSubscription();
  // }

  name: string = 'Martin';
  topic: string = 'Data Binding';
  randomText = '';

  onSave() {
    alert('Data Saved Successfully.');
  }
  onChange() {
    alert('Country has changed.');
  }
}
