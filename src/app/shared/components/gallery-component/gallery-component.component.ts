import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-gallery-component',
    imports: [GalleriaModule, CardModule, ButtonModule],

  templateUrl: './gallery-component.component.html',
  styleUrl: './gallery-component.component.scss'
})
export class GalleryComponentComponent {
  batchSize = 6;
  currentBatch = 1;
  @Input() artworks: any[] = [];
  @Input() isLogin: boolean = false;
  @Input() limit = 0;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    if(this.limit > 0 && this.artworks.length >= this.limit) {
    this.loadMoreCards(); // Cargar la primera tanda de tarjetas al inicio

    }
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if(this.limit > 0 && this.artworks.length >= this.limit) {
      const scrollPosition = window.innerHeight + window.scrollY;
      const maxScroll = document.body.offsetHeight;

      if (scrollPosition >= maxScroll - 300 && this.limit > 0) {
        this.loadMoreCards();
      }
    }
  }

  isLoading = false;

  loadMoreCards(): void {
    if (this.isLoading) return;
    const start = this.currentBatch * this.batchSize;
    const end = (this.currentBatch + 1) * this.batchSize;
    if (start >= this.artworks.length) {
      // Ya no hay más tarjetas que cargar
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      const nextBatch = this.artworks.slice(start, end);
      this.artworks = [...this.artworks, ...nextBatch];
      this.currentBatch++;
      this.isLoading = false;
    }, 1000); // Simula una carga de 1s
  }

  goToArtwork(artwork: any) {
    this.router.navigate(['/profile/artwork/'+ artwork?.uid+'/see', artwork.id]);
  }
}
