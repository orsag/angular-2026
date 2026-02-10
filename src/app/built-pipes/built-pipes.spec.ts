import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltPipes } from './built-pipes';

describe('BuiltPipes', () => {
  let component: BuiltPipes;
  let fixture: ComponentFixture<BuiltPipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuiltPipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuiltPipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
