import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DoughnutComponent } from "../../../../shared/components/charts/doughnut/doughnut.component";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finances',
  imports: [CardModule, TableComponent, DoughnutComponent],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent {
  title: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {

    this.route.data.subscribe((data) => {
      this.title = data['title'];
      console.log('Título de la ruta:', this.title);
    });
  }
}
