import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArtwaorkComponent } from './table-artwaork.component';

describe('TableArtwaorkComponent', () => {
  let component: TableArtwaorkComponent;
  let fixture: ComponentFixture<TableArtwaorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableArtwaorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableArtwaorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
