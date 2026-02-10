import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralFor } from './structural-for';

describe('StructuralFor', () => {
  let component: StructuralFor;
  let fixture: ComponentFixture<StructuralFor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructuralFor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuralFor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
