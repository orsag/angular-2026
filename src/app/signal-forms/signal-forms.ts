import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { email, FormField, form, maxLength, minLength, required } from '@angular/forms/signals';

interface ILoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-signal-forms',
  imports: [FormField, CommonModule],
  templateUrl: './signal-forms.html',
  styleUrl: './signal-forms.scss',
})
export class SignalForms {
  loginModel = signal<ILoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter valid email' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 4, { message: 'Password must be min 4 chars' });
    maxLength(schemaPath.password, 12, { message: 'Password must be max 12 chars' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.loginModel());
    console.log(this.loginForm());
  }

  setForm() {
    this.loginModel.set({
      email: 'tefanus@gmail.com',
      password: 'tefanus123',
    });
  }

  resetForm() {
    this.loginModel.set({ email: '', password: '' });
  }

  updateEmail(newValue: string) {
    // this.loginForm.email().value.set(newValue);
    this.loginModel.update((current) => ({
      ...current,
      email: newValue,
    }));
  }
}
