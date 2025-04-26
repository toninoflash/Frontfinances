import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-circle',
  imports: [CommonModule],
  templateUrl: './gallery-circle.component.html',
  styleUrl: './gallery-circle.component.scss'
})
export class GalleryCircleComponent {

  @Input() items: any[] = [];
  @Input() limit: number= 1;
}
