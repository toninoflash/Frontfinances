import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileupComponent } from './fileup.component';

describe('FileupComponent', () => {
  let component: FileupComponent;
  let fixture: ComponentFixture<FileupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
