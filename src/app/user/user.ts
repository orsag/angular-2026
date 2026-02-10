import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  // export class UserComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  constructor(private router: Router) {
    console.log('Constructor called.');
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   // use for components input property
  //   console.log("1. ngOnChanges called.");
  // }
  // ngOnInit(): void {
  //   // use for API call
  //   console.log("2. ngOnInit called");
  // }
  // ngDoCheck(): void {
  //   // use for every change detection
  //   console.log("3. ngDoCheck called");
  // }
  // ngAfterContentInit(): void {
  //   // use for ng-content
  //   console.log("4. ngAfterContentInit called");
  // }
  // ngAfterContentChecked(): void {
  //   console.log("5. ngAfterContentChecked called");
  // }
  // ngAfterViewInit(): void {
  //   // use for viewChild
  //   console.log("6. ngAfterViewInit called");
  // }
  // ngAfterViewChecked(): void {
  //   console.log("7. ngAfterViewChecked called");
  // }
  // ngOnDestroy(): void {
  //   console.log("8. ngOnDestroy called");
  // }

  loginData() {
    // user verification logic
    // this.router.navigateByUrl("structural-directive");

    this.router.navigate(['data-binding']);
  }
}
