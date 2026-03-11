import { Component, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { Vehicle, initialData, vehicleSchema } from './schema';

@Component({
  selector: 'app-vehicles',
  imports: [FormField],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.scss',
})
export class Vehicles {
  // Create a form model signal with form fields
  // This represents the form's data structure
  vehicleModel = signal<Vehicle>(initialData);

  // Declare a form from the model
  vehicleForm = form(this.vehicleModel, vehicleSchema);
}
