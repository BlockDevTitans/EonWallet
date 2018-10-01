import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyConfigurationComponent } from './key-configuration.component';

describe('KeyConfigurationComponent', () => {
  let component: KeyConfigurationComponent;
  let fixture: ComponentFixture<KeyConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
