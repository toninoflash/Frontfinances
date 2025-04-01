import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsAndMortagageComponent } from './credits-and-mortagage.component';

describe('CreditsAndMortagageComponent', () => {
  let component: CreditsAndMortagageComponent;
  let fixture: ComponentFixture<CreditsAndMortagageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsAndMortagageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditsAndMortagageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
