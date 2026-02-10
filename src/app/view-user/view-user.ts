import { Component, Inject, OnInit } from '@angular/core';
import { Crud as CrudService } from '../Services/crud';
import { ActivatedRoute, Router } from '@angular/router';
import { ReusableComponent } from '../reusable/reusable-component/reusable-component';

@Component({
  selector: 'app-view-user',
  imports: [ReusableComponent],
  templateUrl: './view-user.html',
  styleUrl: './view-user.scss',
})
export class ViewUser implements OnInit {
  parentProperty: string = 'View-user : Kindly read the user details.';

  userData: any;

  userId: {
    uid: number;
  };

  constructor(
    @Inject(CrudService) private crud: CrudService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.userId = { uid: 0 };
  }

  ngOnInit(): void {
    this.userId = {
      uid: this.activeRoute.snapshot.params['id'],
    };
    console.log(this.userId.uid);

    this.crud.getDataById(this.userId.uid).subscribe((res) => {
      this.userData = res;
    });
  }

  onClose() {
    this.router.navigateByUrl('crud');
  }
}
