import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-linked-signals',
  imports: [],
  templateUrl: './linked-signals.html',
  styleUrl: './linked-signals.scss',
})
export class LinkedSignals {
  quantitySignal = signal(1);
  price = 10;
  // total = computed(()=>{
  //   return this.quantitySignal() * this.price;
  // })

  // total = linkedSignal(()=>{
  //   return this.quantitySignal() * this.price;
  // })

  total = linkedSignal({
    source: this.quantitySignal,
    computation: () => this.quantitySignal() * this.price,
  });

  calculate() {
    this.quantitySignal.set(10);
  }
}
