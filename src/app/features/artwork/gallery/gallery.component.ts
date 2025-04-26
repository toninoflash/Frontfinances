import { Component, HostListener, model } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '../../../core/services/photo/photo.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { environment } from '../../../../enviroments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryComponentComponent } from "../../../shared/components/gallery-component/gallery-component.component";
const endpoint: any = environment.baseUrlSpring + 'users';
@Component({
  selector: 'app-gallery',
  imports: [GalleriaModule, CardModule, ButtonModule, GalleryComponentComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  providers: [PhotoService],
})
export class GalleryComponent {
  cards: any[] = [];
  batchSize = 6;
  currentBatch = 1;
  artworks: any[] = [];

  userLogin!: User;
  userIsLoged: boolean = false;
  arthish: User | null = null;

  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private route: ActivatedRoute,

    private router: Router
  ) {}

  ngOnInit() {
    this.userLogin = this.userService.user as User;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUser(id);
      if (id === this.userLogin.id) {
      }
      this.userIsLoged = true;
    } else {
      this.arthish = this.userLogin;
      this.artworks = this.arthish?.artWork as any[];
    }

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
    this.router.navigate(['/profile'+ artwork?.uid+'/artwork/see', artwork.id]);
  }
  async getUser(id: any) {
    await this.baseService
      .getItems(endpoint + '/full/' + id)
      .subscribe((resp) => {
        this.arthish = resp as User;
        this.artworks = this.arthish?.artWork as any[];
      });
  }
}
