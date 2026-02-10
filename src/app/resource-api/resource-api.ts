import { Component, OnInit } from '@angular/core';
import { Resource as ResourceService } from '../Services/resource';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-api',
  imports: [CommonModule],
  templateUrl: './resource-api.html',
  styleUrl: './resource-api.scss',
})
export class ResourceApi implements OnInit {
  constructor(private resource: ResourceService) {}

  apiData: any;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // this.resource.getAllData().subscribe(res => {
    //   this.apiData = res;
    // })

    // this.apiData = this.resource.rxResourceData;

    this.apiData = this.resource.resourceData;
  }
}
