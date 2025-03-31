import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountsComponent } from './myaccounts.component';

describe('MyaccountsComponent', () => {
  let component: MyaccountsComponent;
  let fixture: ComponentFixture<MyaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyaccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
