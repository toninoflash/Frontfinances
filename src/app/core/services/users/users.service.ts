import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { environment } from '../../../../enviroments/environment';
const endpoint: any = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    const storedUser = sessionStorage.getItem("us") ? JSON.parse(sessionStorage.getItem("us")!) : null;
    this._userSubject.next(storedUser);
  }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get user(): User | null {
    return this._userSubject.value;
  }

  set user(newUser: User | null) {
    this._userSubject.next(newUser);
    if (newUser) {
      sessionStorage.setItem('us', JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem('us');
    }
  }

  get userChange(): Observable<User | null> {
    return this._userSubject.asObservable();
  }

  setUser(newUser: User) {
    this.user = newUser;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.user = null;
  }

  login(formData: any) {
    return this.http.post(`${endpoint}/login`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
        this.setUser(resp.usuario);
      }),
      catchError((error) => {
        // Manejar el error
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
    //pendiente de *RegisterForm
    return this.http.post(`${endpoint}/usuarios`, formData);
    return this.http.post(`${endpoint}/login/sendMail`, formData);
  }

  updateUser(newUser:User) {
    return this.http.put(`${endpoint}/user/` + newUser.uid, newUser, {
      headers: {
        'x-token': this.token,
      },
    });
  }
  loginGoogle(token: string) {
    return this.http.post(`${endpoint}/login/google`, { token }).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
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
          const { tipe, name, lastname, email, uid, role, img, createAt,country, city} = resp.usuario;
          this.user = new User(tipe, name, lastname, email, uid, img, role, '',true,createAt,country, city  );
          sessionStorage.setItem('token', resp.token);
          return true;
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  getUsers( desde:number = 0) {
    return this.http.get(`${endpoint}/user`, {
      headers: {
        'x-token': this.token,
      }
    })
    .pipe(
      delay(500),
      map( (resp:any) => {
         let Users = resp.usuarios as User[];
         Users = Users.map(user => new User(user.tipe, user.name, user.lastname, user.email, user.uid, user.role!))
        return {
          Users,
          total: resp.total
        };
      })
    )
  }
  getUserByUID(uid:any) {
    return this.http.get(`${endpoint}/user/${uid}`, {
      headers: {
        'x-token': this.token,
      }
    })
    .pipe(
      delay(500),
      map( (resp:any) => {
         let user = resp.user as User;
         let favoritesProtected = resp.favoritesProtected;
        return {
          user,
          favoritesProtected
        };
      })
    )
  }

}
