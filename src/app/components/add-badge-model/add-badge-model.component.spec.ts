import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBadgeModelComponent } from './add-badge-model.component';

describe('AddBadgeModelComponent', () => {
  let component: AddBadgeModelComponent;
  let fixture: ComponentFixture<AddBadgeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBadgeModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBadgeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
