import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from '../../../core/interfaces';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { FormsAccount } from '../../../features/account/models/forms';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-carrusel',
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    NumberFormatPipe,
    Card
  ],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss',
})
export class CarruselComponent implements OnInit {
  dynamicGroup: any = FormsAccount.createGroup;
  dynamicUpdateGroup: any = FormsAccount.updateGroup;
  @Output() onButton = new EventEmitter<any>();
  @Input() dataSource: any[] = [];
  products: any[] = [];
  empty: number = 0;
  currentProduct: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.dataSource$.subscribe((dataSource: any) => {
      this.dataSource = dataSource;
      this.empty = this.dataSource.length;
      if (this.dataSource.length > 0) {
        this.currentProduct = this.dataSource[0]; // Inicializa con el primer producto
        this.runEmmiter(this.currentProduct);
      }
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }

  runEmmiter(value: any) {
    this.onButton.emit(value);
  }

  onProductChange(event: any) {
    const currentIndex = event.page; // Índice de la página actual
    this.currentProduct = this.dataSource[currentIndex]; // Actualiza el producto actual
    this.runEmmiter(this.currentProduct);
  }
}
