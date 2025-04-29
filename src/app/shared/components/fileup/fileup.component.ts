import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { FileUpload, FileUploadEvent, UploadEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-fileup',
  imports: [
    FileUpload,
    ButtonModule,
    BadgeModule,
    ToastModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './fileup.component.html',
  styleUrl: './fileup.component.scss',
})
export class FileupComponent {
  uploadedFiles: any[] = [];
  constructor(private messageService: MessageService) {}
  onUpload(event: { files: File[] }) {
    this.uploadedFiles = [];
    this.previewImageUrl = null;

    if (event.files && event.files.length > 0) {
        const selectedFile = event.files[0];

        if (!selectedFile.type.startsWith('image/')) {
            this.showError('Solo se permiten imágenes');
            return;
        }

        this.uploadedFiles = [selectedFile];

        // Generar previsualización
        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImageUrl = e.target?.result ?? null;
        };
        reader.readAsDataURL(selectedFile);

        this.showSuccess(`Imagen "${selectedFile.name}" cargada`);
    }
}
  previewImageUrl: string | ArrayBuffer | null = null;



private showError(message: string) {
    this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000
    });
}

private showSuccess(message: string) {
    this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: message,
        life: 3000
    });
}
}
