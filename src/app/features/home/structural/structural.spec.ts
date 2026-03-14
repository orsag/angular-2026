import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Structural } from './structural';

describe('Structural', () => {
  let component: Structural;
  let fixture: ComponentFixture<Structural>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Structural]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Structural);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
