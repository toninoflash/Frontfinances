import { MegaMenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { ActivatedRoute } from '@angular/router';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-incomes-bills',
  imports: [CardModule, MultiSelectModule, ButtonModule, TableComponent],
  templateUrl: './incomes-bills.component.html',
  styleUrl: './incomes-bills.component.scss',
})
export class IncomesBillsComponent implements OnInit {
  items: MegaMenuItem[] | undefined;
  categories: MegaMenuItem[] | undefined;
  periodos: MegaMenuItem[] | undefined;

  value1!: any[];

  value2!: any[];

  value3!: any[];

  title: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      console.log('Título de la ruta:', this.title);
    });
    (this.items = [
      [
        {
          label: 'Movimientos',
          items: [
            {
              label: 'Ingresos',
              checked: false, // Estado inicial del checkbox
              command: () => {
                console.log('Ingresos seleccionados:');
              },
            },
            {
              label: 'Gastos',
              checked: false, // Estado inicial del checkbox
              command: () => {
                console.log('Ingresos seleccionados:');
              },
            },
            {
              label: 'No computables',
              checked: false, // Estado inicial del checkbox
              command: () => {
                console.log('Ingresos seleccionados:');
              },
            },
          ],
        },
      ],
    ]),
      this.items = [
        { name: 'Ingresos', code: 'NY' },
        { name: 'Gastos', code: 'RM' },
        { name: 'No computables', code: 'LDN' },
      ];
    this.categories = [
      { name: 'Ingreso fijo', code: 'NY' },
      { name: 'Ingreso extra', code: 'NY' },
      { name: 'Gasto fijo', code: 'RM' },
      { name: 'Gasto extra', code: 'RM' },
      { name: 'Crédito', code: 'LDN' },
      { name: 'Hipoteca', code: 'LDN' },
      { name: 'Hucha', code: 'LDN' },
    ];
    this.periodos = [
      { name: 'Mes', code: 'NY' },
      { name: '3 meses', code: 'RM' },
      { name: '6 meses', code: 'LDN' },
      { name: '12 meses', code: 'LDN' },
      { name: 'Año actual', code: 'LDN' },
    ];
  }
}
