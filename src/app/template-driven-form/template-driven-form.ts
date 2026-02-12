import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../types';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.scss',
})
export class TemplateDrivenForm {
  userObject: User = {};

  onSubmit(userForm: NgForm) {
    console.log(userForm.value);
  }

  ngOnInit(): void {
    // this.userObject = {
    //   firstName : "Rahul",
    //   lastName : "Verma",
    //   email : "rahul@gmail.com",
    //   pass : 12345,
    //   isCheck : true,
    // }
  }

  setValues(userForm: NgForm) {
    let obj = {
      firstName: 'Rahul',
      lastName: 'Verma',
      email: 'rahul@gmail.com',
      pass: 12345,
      isCheck: true,
    };
    userForm.setValue(obj);
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
