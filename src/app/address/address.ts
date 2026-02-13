import {Component, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import { IAddress } from '../types';
import {form, required, minLength, maxLength, FormField} from '@angular/forms/signals';
import {CommonModule} from '@angular/common';
import {SharedData as SharedDataService} from '../Services/shared-data';

declare var bootstrap: any;

const getEmptyForm = (): IAddress => ({
  street: '', suite: '', city: '', zipcode: '',
  country: '', region: '', currency: '',
  geo: { lat: '', lng: '' },
});

@Component({
  selector: 'app-address',
  imports: [FormField, CommonModule],
  templateUrl: './address.html',
  styleUrl: './address.scss',
})
export class Address implements OnInit {
  @ViewChild('confirmModal') modalElement!: ElementRef;
  private _sharedData = inject(SharedDataService);
  addressModel = signal<IAddress>(getEmptyForm());

  ngOnInit() {
    if (this._sharedData) {
      const previousAddress = this._sharedData?.getLocalStorage('address');
      if (previousAddress) {
        this.addressModel.set(JSON.parse(previousAddress) as IAddress);
      }
    }
  }

  addressForm = form(this.addressModel, (schemaPath) => {
    required(schemaPath.city, { message: 'City is required' });
    required(schemaPath.street, { message: 'Street is required' });
    required(schemaPath.country, { message: 'Country is required' });
    required(schemaPath.region, { message: 'Region is required' });
    minLength(schemaPath.currency, 3, { message: 'Currency must be min 3 chars' });
    maxLength(schemaPath.suite, 12, { message: 'Suite must be max 12 chars' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.addressForm().valid()) {
      const modal = new bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
    }
  }

  processSave() {
    if (this.addressForm().valid()) {
      const data = this.addressModel();
      const stringData = JSON.stringify(data);
      this._sharedData.setLocalStorage('address', stringData);
    }
  }

  onReset() {
    this.addressModel.set(getEmptyForm());
  }

  onAutofill() {
    // 3. Example of how to patch the signal
    this.addressModel.set({
      street: '123 Signal Ave',
      suite: 'Suite 1',
      city: 'Angular City',
      zipcode: '10101',
      country: 'Webland',
      region: 'Europe',
      currency: 'USD',
      geo: { lat: '45.0', lng: '90.0' }
    });
  }
}
