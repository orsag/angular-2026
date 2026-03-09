import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { CustomPipe } from '../Pipes/custom-pipe';
import { PurePipe } from '../Pipes/pure-pipe';
import { ImpurePipe } from '../Pipes/impure-pipe';
import { CustomDatePipe } from '../Pipes/custom-date-pipe';

@Component({
  selector: 'app-built-pipes',
  imports: [CommonModule, CustomPipe, PurePipe, ImpurePipe, CustomDatePipe],
  templateUrl: './built-pipes.html',
  styleUrl: './built-pipes.scss',
})
export class BuiltPipes {
  mobileNumber: any = '0949 131 158';
  // COMMAND TO CREATE CUSTOM PIPE
  //  ng generate pipe /Pipes/custom-date

  angularPipes: string = 'use pipes to format data in angular templates';
  personData = {
    name: 'John',
    age: 30,
    city: 'Mumbai',
  };

  currentDate: Date = new Date();

  items = of(['Apple', 'Banana', 'Mango']);
}
