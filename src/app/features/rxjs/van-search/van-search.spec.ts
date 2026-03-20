import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanSearch } from './van-search';

describe('VanSearch', () => {
  let component: VanSearch;
  let fixture: ComponentFixture<VanSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(VanSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
