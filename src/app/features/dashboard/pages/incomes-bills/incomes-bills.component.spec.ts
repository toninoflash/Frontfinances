import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesBillsComponent } from './incomes-bills.component';

describe('IncomesBillsComponent', () => {
  let component: IncomesBillsComponent;
  let fixture: ComponentFixture<IncomesBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomesBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
