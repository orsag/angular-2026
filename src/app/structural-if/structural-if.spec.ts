import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralIf } from './structural-if';

describe('StructuralIf', () => {
  let component: StructuralIf;
  let fixture: ComponentFixture<StructuralIf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructuralIf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuralIf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
