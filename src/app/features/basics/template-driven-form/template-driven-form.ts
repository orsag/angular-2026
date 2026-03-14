import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface LocalUser {
  firstName: string;
  lastName: string;
  email: string;
  pass: number;
  isCheck: boolean;
}

const DEFAULT = {
  firstName: 'Rahul',
  lastName: 'Verma',
  email: 'rahul@gmail.com',
  pass: 12345,
  isCheck: true,
};

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.scss',
})
export class TemplateDrivenForm {
  userObject: LocalUser;

  constructor() {
    this.userObject = { ...DEFAULT };
  }

  onSubmit(userForm: NgForm) {
    console.log(userForm.value);
  }

  ngOnInit(): void {
    this.userObject = {
      ...DEFAULT,
    };
  }

  setValues(userForm: NgForm) {
    userForm.setValue({ ...DEFAULT });
  }

  patchValues(userForm: NgForm) {
    let obj = {
      firstName: 'Rahul',
      lastName: 'Verma',
      email: 'rahul@gmail.com',
    };
    userForm.control.patchValue(obj);
  }

  resetValues(userForm: NgForm) {
    // userForm.reset();
    userForm.resetForm();
  }
}
