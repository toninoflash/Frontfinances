import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule, ButtonModule,CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  showBackButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showBackButton = this.router.url !== '/';
      this.updateBreadcrumbs();
    });

    this.updateBreadcrumbs();
  }

  // Método para navegar atrás
  goBack(): void {
    this.location.back();
  }

  // Método para actualizar los breadcrumbs
  updateBreadcrumbs() {
    this.items = [];
    let currentRoute = this.route.root;
    let urlSegments: string[] = [];
    this.buildBreadcrumbs(currentRoute, urlSegments);

    // Deshabilitar navegación en todos los items excepto Home
    this.items = this.items.map(item => ({
      ...item,
      routerLink: undefined, // Elimina el enlace
      command: () => {}, // Elimina cualquier acción
      styleClass: 'non-clickable' // Añade clase para estilos
    }));
  }

  // Función recursiva para construir los breadcrumbs (sin cambios)
  buildBreadcrumbs(route: ActivatedRoute, urlSegments: string[]) {
    const routeSnapshot = route.snapshot;

    if (routeSnapshot.data && routeSnapshot.data['title']) {
      this.items.push({
        label: routeSnapshot.data['title'],
        routerLink: '/' + urlSegments.join('/')
      });
    }

    const childrenRoutes = route.children;
    if (childrenRoutes.length === 0) return;

    childrenRoutes.forEach(childRoute => {
      const childSnapshot = childRoute.snapshot;

      if (childSnapshot.url.length) {
        childSnapshot.url.forEach(segment => {
          urlSegments.push(segment.path);
        });
      }

      this.buildBreadcrumbs(childRoute, urlSegments);

      if (childSnapshot.url.length) {
        childSnapshot.url.forEach(() => urlSegments.pop());
      }
    });
  }
}
