import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery-circle',
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery-circle.component.html',
  styleUrl: './gallery-circle.component.scss'
})
export class GalleryCircleComponent {

  @Input() items: any[] = [];
  @Input() limit: number= 1;
}
