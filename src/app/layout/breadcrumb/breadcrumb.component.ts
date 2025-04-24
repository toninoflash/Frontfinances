import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs';
@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent  implements OnInit{
  items: MenuItem[] = [];
  home: MenuItem | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });

    this.updateBreadcrumbs();
  }

  // Método para actualizar los breadcrumbs según la URL actual
  updateBreadcrumbs() {
    this.items = [];  // Limpiar los items actuales

    let currentRoute = this.route.root;  // Empezar desde la raíz
    let urlSegments: string[] = [];  // Para almacenar los segmentos de la URL

    // Recorrer las rutas para construir los breadcrumbs
    this.buildBreadcrumbs(currentRoute, urlSegments);

  }

  // Función recursiva para construir los breadcrumbs
  buildBreadcrumbs(route: ActivatedRoute, urlSegments: string[]) {
    const routeSnapshot = route.snapshot;

    // Si la ruta actual tiene un título en los datos, añadirlo (aunque no tenga URL propia)
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

      // Añadir los segmentos al path
      if (childSnapshot.url.length) {
        childSnapshot.url.forEach(segment => {
          urlSegments.push(segment.path);
        });
      }

      // Llamada recursiva
      this.buildBreadcrumbs(childRoute, urlSegments);

      // Quitar los segmentos agregados para esta ruta
      if (childSnapshot.url.length) {
        childSnapshot.url.forEach(() => urlSegments.pop());
      }
    });
  }
}
