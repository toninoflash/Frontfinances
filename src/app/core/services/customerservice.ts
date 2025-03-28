import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class CustomerService {
  constructor() {}

  // Simula la obtención de datos de clientes
  getCustomersLarge(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            code: 1,
            name: 'Nómina',
            date: '2025-03-01',
            status: 'qualified',
            category: 'Ingreso fijo',
            quantity: '1300',
          },
          {
            code: 2,
            name: 'Nómina',
            date: '2025-03-01',
            status: 'qualified',
            category: 'Ingreso fijo',
            quantity: '1300',
          },
          {
            code: 3,
            name: 'Nómina',
            date: '2025-03-01',
            status: 'qualified',
            category: 'Ingreso fijo',
            quantity: '1300',
          },
        ]);
      }, 1000); // Simula un retraso de 1 segundo
    });
  }
}
