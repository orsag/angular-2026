import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeDirectives } from './attribute-directives';

describe('AttributeDirectives', () => {
  let component: AttributeDirectives;
  let fixture: ComponentFixture<AttributeDirectives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeDirectives]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeDirectives);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
