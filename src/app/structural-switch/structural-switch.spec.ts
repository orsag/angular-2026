import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralSwitch } from './structural-switch';

describe('StructuralSwitch', () => {
  let component: StructuralSwitch;
  let fixture: ComponentFixture<StructuralSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructuralSwitch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuralSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
