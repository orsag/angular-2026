import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Crud as CrudService } from '../Services/crud';
import { ReusableComponent } from '../reusable/reusable-component/reusable-component';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, ReusableComponent],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {
  parentProperty: string = 'Add-User : Kindly add the user details.';

  addUserForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private crud: CrudService) {
    this.addUserForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
    });
  }

  onSubmit() {
    // console.log(this.addUserForm.value);
    this.crud.postData(this.addUserForm.value).subscribe((res) => {
      this.router.navigateByUrl('crud');
    });
  }

  onCancel() {
    this.router.navigateByUrl('crud');
  }
}
