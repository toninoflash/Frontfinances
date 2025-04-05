import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

const endpoint: any = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isSessionStorageAvailable()) {
      const storedUser = sessionStorage.getItem('us') ? JSON.parse(sessionStorage.getItem('us')!) : null;
      this._userSubject.next(storedUser);
    } else {
      this._userSubject.next(null); // Si no está en el navegador, inicializa con null
    }
  }

  // Verifica si sessionStorage está disponible
  private isSessionStorageAvailable(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // sessionStorage no está disponible en el servidor
    }
    try {
      const testKey = '__test__';
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  get token(): string {
    if (this.isSessionStorageAvailable()) {
      return sessionStorage.getItem('token') || '';
    }
    return '';
  }

  get user(): User | null {
    return this._userSubject.value;
  }

  set user(newUser: User | null) {
    this._userSubject.next(newUser);
    if (this.isSessionStorageAvailable()) {
      if (newUser) {
        sessionStorage.setItem('us', JSON.stringify(newUser));
      } else {
        sessionStorage.removeItem('us');
      }
    }
  }

  get userChange(): Observable<User | null> {
    return this._userSubject.asObservable();
  }

  setUser(newUser: User) {
    this.user = newUser;
  }

  logout() {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.removeItem('token');
    }
    this.user = null;
  }

  login(formData: any) {
    return this.http.post(`${endpoint}/login`, formData).pipe(
      tap((resp: any) => {
        if (this.isSessionStorageAvailable()) {
          sessionStorage.setItem('token', resp.token);
        }
        this.setUser(resp.usuario);
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(() => new Error(this.getErrorMessage(error)));
      })
    );
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'No se pudo conectar al servidor. Verifica tu conexión.';
    }
    if (error.status >= 400 && error.status < 500) {
      return 'Credenciales incorrectas. Por favor, verifica e intenta nuevamente.';
    }
    if (error.status >= 500) {
      return 'Hubo un problema en el servidor. Intenta más tarde.';
    }
    return 'Ocurrió un error inesperado. Intenta más tarde.';
  }

  createUser(formData: any) {
    return this.http.post(`${endpoint}/usuarios`, formData);
  }

  updateUser(newUser: User) {
    return this.http.put(`${endpoint}/user/` + newUser.uid, newUser, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  loginGoogle(token: string) {
    return this.http.post(`${endpoint}/login/google`, { token }).pipe(
      tap((resp: any) => {
        if (this.isSessionStorageAvailable()) {
          sessionStorage.setItem('token', resp.token);
        }
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${endpoint}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { tipe, name, lastname, email, uid, role, img, createAt, country, city } = resp.usuario;
          this.user = new User(tipe, name, lastname, email, uid, img, role, '', true, createAt, country, city);
          if (this.isSessionStorageAvailable()) {
            sessionStorage.setItem('token', resp.token);
          }
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  getUsers(desde: number = 0) {
    return this.http.get(`${endpoint}/user`, {
      headers: {
        'x-token': this.token,
      },
    }).pipe(
      delay(500),
      map((resp: any) => {
        let Users = resp.usuarios as User[];
        Users = Users.map((user) => new User(user.tipe, user.name, user.lastname, user.email, user.uid, user.role!));
        return {
          Users,
          total: resp.total,
        };
      })
    );
  }

  getUserByUID(uid: any) {
    return this.http.get(`${endpoint}/user/${uid}`, {
      headers: {
        'x-token': this.token,
      },
    }).pipe(
      delay(500),
      map((resp: any) => {
        let user = resp.user as User;
        let favoritesProtected = resp.favoritesProtected;
        return {
          user,
          favoritesProtected,
        };
      })
    );
  }
}
