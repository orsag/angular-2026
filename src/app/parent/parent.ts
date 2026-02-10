import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ReusableComponent } from '../reusable/reusable-component/reusable-component';
import { Child as ChildComponent } from '../child/child';
import { Sibling1 as Sibling1Component } from '../sibling1/sibling1';
import { Sibling2 as Sibling2Component } from '../sibling2/sibling2';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent, Sibling1Component, Sibling2Component, ReusableComponent],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent implements AfterViewInit {
  parentProperty: string = 'This is the parent component data';
  receiveMessage: string = '';
  sibling1Data: any;
  sibling2Data: any;

  @ViewChild('reusable') reusableComp: ReusableComponent | null;

  constructor() {
    this.reusableComp = null;
  }

  ngAfterViewInit(): void {
    if (this.reusableComp) {
      this.reusableComp.heading.set('Greeting from Parent Component.');
    }
  }

  receiveData(data: any) {
    this.receiveMessage = data;
  }

  receiveEvent1(data: any) {
    this.sibling1Data = data;
    console.log(this.sibling1Data);
  }

  receiveEvent2(data: any) {
    this.sibling2Data = data;
  }
}
