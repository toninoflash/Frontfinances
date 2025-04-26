import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCircleComponent } from './gallery-circle.component';

describe('GalleryCircleComponent', () => {
  let component: GalleryCircleComponent;
  let fixture: ComponentFixture<GalleryCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
