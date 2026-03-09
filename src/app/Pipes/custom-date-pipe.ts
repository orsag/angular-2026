import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  private DatePipe = new DatePipe('en-US');

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == '' || value == null || value == undefined) {
      return 'NA';
    }
    if (value instanceof Date) {
      return this.DatePipe.transform(value, 'dd-MM-yyyy');
    }
    return 'ERR';
  }
}
