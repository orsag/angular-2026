import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanTable } from './van-table';

describe('VanTable', () => {
  let component: VanTable;
  let fixture: ComponentFixture<VanTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
