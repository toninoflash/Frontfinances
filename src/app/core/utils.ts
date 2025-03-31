
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BaseServiceService } from './services/base-service.service';
import { MessageService } from 'primeng/api';

export class Utils {
  TODAY: Date = new Date();

  constructor(

  ) {}

  static showMessage(messageService: MessageService,severity: string, summary: string, detail: string) {
    messageService.add({ severity, summary, detail });
}
// Método para formatear la fecha
static formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short', // Día de la semana abreviado (Lun, Mar, etc.)
    day: '2-digit', // Día del mes con dos dígitos
    month: 'short', // Mes abreviado (ene, feb, mar, etc.)
    year: 'numeric', // Año completo
    hour: '2-digit', // Hora con dos dígitos
    minute: '2-digit', // Minutos con dos dígitos
  });

  // Formatear la fecha
  const formattedDate = formatter.format(date);

  // Capitalizar la primera letra del mes
  return formattedDate.replace(/\b\w/g, (char) => char.toUpperCase());
}

static paintMothActuallity(passData?: boolean): string {
  // Obtener la fecha actual
  const date = new Date();

  if (passData) {
    // Ajustar el día al 1 para evitar problemas con meses de diferente duración
    date.setDate(1);

    // Restar un mes a la fecha actual
    date.setMonth(date.getMonth() - 1);
  }

  // Formatear el mes en español y capitalizar la primera letra
  return new Intl.DateTimeFormat('es-ES', { month: 'long' })
    .format(date)
    .replace(/^\w/, (c) => c.toUpperCase());
}

}
