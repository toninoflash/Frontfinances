import { Component, HostListener, model } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '../../../core/services/photo/photo.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-gallery',
  imports: [GalleriaModule, CardModule, ButtonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  providers: [PhotoService]
})
export class GalleryComponent {
  cards: any[] = [];
allCards: any[] = [];
batchSize = 12;
currentBatch = 0;

ngOnInit() {
  // Simula todas las tarjetas disponibles
  this.allCards = Array.from({ length: 36 }).map((_, i) => ({
    title: `Card #${i + 1}`,
    subtitle: 'Card subtitle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  }));

  this.loadMoreCards();
}

@HostListener('window:scroll', [])
onScroll(): void {
  const scrollPosition = window.innerHeight + window.scrollY;
  const maxScroll = document.body.offsetHeight;

  if (scrollPosition >= maxScroll - 300) {
    this.loadMoreCards();
  }
}

isLoading = false;

loadMoreCards(): void {
  if (this.isLoading) return;

  const start = this.currentBatch * this.batchSize;
  const end = (this.currentBatch + 1) * this.batchSize;

  if (start >= this.allCards.length) {
    // Ya no hay más tarjetas que cargar
    return;
  }

  this.isLoading = true;

  setTimeout(() => {
    const nextBatch = this.allCards.slice(start, end);

    this.cards = [...this.cards, ...nextBatch];
    this.currentBatch++;
    this.isLoading = false;
  }, 1000); // Simula una carga de 1s
}



}
