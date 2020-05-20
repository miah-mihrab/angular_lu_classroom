import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasroomComponent } from './clasroom.component';

describe('ClasroomComponent', () => {
  let component: ClasroomComponent;
  let fixture: ComponentFixture<ClasroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
