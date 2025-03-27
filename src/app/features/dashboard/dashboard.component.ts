import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MenuLeftComponent } from '../../shared/components/menu-left/menu-left.component';
import { MenuTopComponent } from '../../shared/components/menu-top/menu-top.component';
import { CommonModule } from '@angular/common';
import { FinancesComponent } from "./pages/finances/finances.component";
import { IncomesBillsComponent } from "./pages/incomes-bills/incomes-bills.component";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [MenuLeftComponent, MenuTopComponent, CommonModule, FinancesComponent, IncomesBillsComponent],
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] | undefined;
  isMenuVisible: boolean = false;
  page:number=0;
  ngOnInit() {
    this.items = [
      {
        label: 'Mis finanzas',
        icon: 'pi pi-file',
        command: () => {
          this.page = 0;
          console.log('Página actual:', this.page);
        },
      },
      {
        label: 'Ingresos y gastos',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: 'Ir a',
            icon: 'pi pi-eye',
            command: () => {
              this.page = 1;
              console.log('Página actual:', this.page);
            },
          },
          {
            label: 'Añadir',
            icon: 'pi pi-plus',
            command: () => {
              this.page = 2;
              console.log('Página actual:', this.page);
            },
          },
        ],
      },
      {
        label: 'Mis productos',
        icon: 'pi pi-shopping-cart',
        command: () => {
          this.page = 3;
          console.log('Página actual:', this.page);
        },
      },
      {
        separator: true,
      },
      {
        label: 'Tarjetas',
        icon: 'pi pi-credit-card',
        items: [
          {
            label: 'Ir a',
            icon: 'pi pi-eye',
            command: () => {
              this.page = 4;
              console.log('Página actual:', this.page);
            },
          },
          {
            label: 'Añadir',
            icon: 'pi pi-plus',
            command: () => {
              this.page = 5;
              console.log('Página actual:', this.page);
            },
          },
        ],
      },
    ];
  }
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
