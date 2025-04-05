import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
  ngOnInit() {
    // Verifica el tema almacenado en localStorage

    if (this.isLocalStorageAvailable()) {
      const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.querySelector('html')?.classList.add('my-app-dark'); // Aplica el tema oscuro
    }
    }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
