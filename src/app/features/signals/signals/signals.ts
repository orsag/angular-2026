import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.scss',
})
export class Signals {
  normalCounter = 0;
  counter = signal(0);
  // counter : WritableSignal<number> = signal(0);

  constructor() {
    this.counter.set(5);
    // setTimeout(()=>{
    //   // this.normalCounter = 50;
    //   this.counter.set(30);
    //   console.log("counter Value => " + this.counter());
    // },5000)

    effect(() => console.log('The value of counter is : ' + this.counter()));
  }
  onIncrement() {
    this.counter.update((initialValue) => initialValue + 1);
  }
}
