import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutDynamicComponent } from './doughnut-dynamic.component';

describe('DoughnutDynamicComponent', () => {
  let component: DoughnutDynamicComponent;
  let fixture: ComponentFixture<DoughnutDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughnutDynamicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoughnutDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
