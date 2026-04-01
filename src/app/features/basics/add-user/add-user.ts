import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Crud as CrudService } from '@services/crud';
import { ReusableComponent } from '@components/reusable-component/reusable-component';
import { User } from '@types';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, ReusableComponent],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {
  parentProperty: string = 'Add-User : Kindly add the user details.';

  addUserForm: FormGroup; // reactive forms

  constructor(
    private router: Router,
    private fb: NonNullableFormBuilder,
    private crud: CrudService,
  ) {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
    });
  }

  onSubmit() {
    const value = this.addUserForm.getRawValue();
    console.log(value);
    this.crud.postData(this.addUserForm.value).subscribe((res) => {
      this.router.navigateByUrl('crud');
    });
  }

  onCancel() {
    this.router.navigateByUrl('crud');
  }
}
