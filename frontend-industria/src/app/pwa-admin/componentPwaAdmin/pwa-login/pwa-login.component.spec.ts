import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaLoginComponent } from './pwa-login.component';

describe('PwaLoginComponent', () => {
  let component: PwaLoginComponent;
  let fixture: ComponentFixture<PwaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
