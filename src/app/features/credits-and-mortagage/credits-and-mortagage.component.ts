import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MenuLeftComponent } from '../../shared/components/menu-left/menu-left.component';
import { MenuTopComponent } from '../../shared/components/menu-top/menu-top.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-credits-and-mortagage',
  imports: [RouterOutlet ,MenuLeftComponent, MenuTopComponent, CommonModule, ],

  templateUrl: './credits-and-mortagage.component.html',
  styleUrl: './credits-and-mortagage.component.scss'
})
export class CreditsAndMortagageComponent {
  title: string = '';
  items: MenuItem[] | undefined;
  isMenuVisible: boolean = false;
  page:number=0;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Mis finanzas',
        icon: 'pi pi-file',
        route: 'finances',
      },
      {
        label: 'Mis productos',
        icon: 'pi pi-shopping-cart',
        route: 'product',
      },
      {
        label: 'Ingresos y gastos',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: 'Listado',
            icon: 'pi pi-eye',
            route: 'incomes-bills',

          },
          {
            label: 'Calendario',
            icon: 'pi pi-calendar',
            route: 'calendar',

          },
          {
            label: 'Evolución',
            icon: 'pi pi-chart-line',
        route: 'evolution',

            // command: () => {
            //   this.page = 2;
            //   console.log('Página actual:', this.page);
            // },
          },
        ],
      },
      {
        label: 'Tarjetas',
        icon: 'pi pi-credit-card',
        items: [
          {
            label: 'Ir a',
            icon: 'pi pi-eye',
            route: 'card',

          },
          {
            label: 'Añadir',
            icon: 'pi pi-plus',
            route: 'add',

          },
        ],
      },
    ];
    this.route.data.subscribe((data) => {
      this.title = data['title'];
    });
  }

}
