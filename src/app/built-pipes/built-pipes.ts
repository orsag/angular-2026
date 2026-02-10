import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { CustomPipe } from '../Pipes/custom-pipe';
import { PurePipe } from '../Pipes/pure-pipe';
import { ImpurePipe } from '../Pipes/impure-pipe';

@Component({
  selector: 'app-built-pipes',
  imports: [CommonModule, CustomPipe, PurePipe, ImpurePipe],
  templateUrl: './built-pipes.html',
  styleUrl: './built-pipes.scss',
})
export class BuiltPipes {
  mobileNumber: any = null;

  angularPipes: string = 'use pipes to format data in angular templates';
  personData = {
    name: 'John',
    age: 30,
    city: 'Mumbai',
  };

  currentDate: Date = new Date();

  items = of(['Apple', 'Banana', 'Mango']);
}
