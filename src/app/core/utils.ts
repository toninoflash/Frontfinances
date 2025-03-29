
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BaseServiceService } from './services/base-service.service';
import { MessageService } from 'primeng/api';

export class Utils {
  TODAY: Date = new Date();

  constructor(
    private messageService: MessageService,
    public baseService: BaseServiceService
  ) {}

  static showMessage(messageService: MessageService,severity: string, summary: string, detail: string) {
    messageService.add({ severity, summary, detail });
}

}
