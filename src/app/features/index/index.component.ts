import { Component } from '@angular/core';
import { GalleryComponentComponent } from "../../shared/components/gallery-component/gallery-component.component";
import { environment } from '../../../enviroments/environment';
import { UserService } from '../../core/services/users/users.service';
import { BaseServiceService } from '../../core/services/base-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GalleryCircleComponent } from "../../shared/components/gallery-circle/gallery-circle.component";
import { CalendarComponent } from "../../shared/components/calendar/calendar.component";
const endpoint: any = environment.baseUrlSpring;
@Component({
  selector: 'app-index',
  imports: [GalleryComponentComponent, CommonModule, GalleryCircleComponent, CalendarComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  artworks: any[] = [];
  bests: any[] = [];
  events = [
    {
      title: 'Exposición de arte moderno',
      description: 'Una exposición de arte contemporáneo que no te puedes perder.',
      location: 'Museo de Arte Moderno, Madrid',
      date: '15 de Mayo, 2025',
      image: 'https://www.museoreinasofia.es/sites/default/files/styles/featured_image/public/2023-10/2023-10-04_16-23-00_0.jpg?h=8b2f1a4d&itok=5vXk6c7g'
    },
    {
      title: 'Concurso de pintura al aire libre',
      description: 'Pinta y gana premios increíbles.',
      location: 'Parque Central, Barcelona',
      date: '22 de Mayo, 2025',
      image: 'https://www.museoreinasofia.es/sites/default/files/styles/featured_image/public/2023-10/2023-10-04_16-23-00_0.jpg?h=8b2f1a4d&itok=5vXk6c7g'
    }
  ];
// Variables que contienen los datos a mostrar
  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
  ) {}
  ngOnInit() {
    this.getArtworks();
    this.getUser()
  }
  getArtworks() {
    const url = `${endpoint}artwork`;
      this.baseService
        .getItems(url )
        .subscribe((resp) => {
          this.artworks = resp as any[];
        });
    }
  getUser() {
    const url = `${endpoint}users`;

    this.baseService.getItems(url).subscribe((resp) => {
      this.bests = resp as any[];
    });
  }
}
