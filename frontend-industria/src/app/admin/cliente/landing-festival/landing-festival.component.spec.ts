import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFestivalComponent } from './landing-festival.component';

describe('LandingFestivalComponent', () => {
  let component: LandingFestivalComponent;
  let fixture: ComponentFixture<LandingFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingFestivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
