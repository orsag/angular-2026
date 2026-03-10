import { Component, computed, effect, inject, linkedSignal } from '@angular/core';
import { Resource as ResourceService } from '../Services/resource';

@Component({
  selector: 'app-resource-api',
  imports: [],
  templateUrl: './resource-api.html',
  styleUrl: './resource-api.scss',
})
export class ResourceApi {
  private resourceService = inject(ResourceService);
  // constructor(private resourceService: ResourceService) {}

  // The rxResource returns a ResourceRef<T>. While it isn't a simple Signal<T>,
  // its primary members—.value(), .status(), .isLoading(), and .error()—are all Readonly Signals.

  userData = this.resourceService.rxResourceData;
  selectedUser2 = this.resourceService.userResource;

  eff = effect(() => {
    console.log('Status:', this.resourceService.rxResourceData.status());
    // console.log('Value:', this.resourceService.rxResourceData.value());

    // type ResourceStatus = 'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local'
    if (this.userData.status() === 'resolved') {
      console.log('Data loaded successfully!');
    }
  });

  completeName = linkedSignal({
    source: this.selectedUser2.value,
    computation: () =>
      this.selectedUser2.value()?.name.firstname + ' ' + this.selectedUser2.value()?.name.lastname,
  });

  eff2 = effect(() => {
    console.log('Status:', this.resourceService.userResource.status());
    // console.log('Value:', this.resourceService.userResource.value());

    // type ResourceStatus = 'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local'
    if (this.selectedUser2.status() === 'resolved') {
      console.log('Data loaded successfully!');
    }
  });

  handleLoadUser() {
    this.resourceService.loadUser(1);
  }

  getData() {
    // this.resource.getAllData().subscribe(res => {
    //   this.apiData = res;
    // })
    // this.apiData = this.resource.rxResourceData;
    // this.apiData = this.resourceService.resourceData;
  }
}
