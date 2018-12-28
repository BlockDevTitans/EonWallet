import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSetupPageComponent } from './new-setup-page.component';

describe('NewSetupPageComponent', () => {
  let component: NewSetupPageComponent;
  let fixture: ComponentFixture<NewSetupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSetupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
