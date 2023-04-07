import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaHomeComponent } from './pwa-home.component';

describe('PwaHomeComponent', () => {
  let component: PwaHomeComponent;
  let fixture: ComponentFixture<PwaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
