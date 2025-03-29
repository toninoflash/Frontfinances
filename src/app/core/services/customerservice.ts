import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class CustomerService {
  private _dataSource = new BehaviorSubject<any[]>([]); // BehaviorSubject para emitir cambios

  // Getter para obtener el observable del dataSource
  get dataSource$() {
    return this._dataSource.asObservable();
  }

  // Setter para actualizar el valor de dataSource
  set dataSource(value: any[]) {
    this._dataSource.next(value); // Emite el nuevo valor
  }

  // Método para obtener el valor actual de dataSource
  get dataSource(): any[] {
    return this._dataSource.getValue();
  }
  constructor() {}

  // Simula la obtención de datos de clientes
  getCustomersLarge(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.dataSource);
      }, 1000); // Simula un retraso de 1 segundo
    });
  }
}
