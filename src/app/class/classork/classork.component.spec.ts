import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassorkComponent } from './classork.component';

describe('ClassorkComponent', () => {
  let component: ClassorkComponent;
  let fixture: ComponentFixture<ClassorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
