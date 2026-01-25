import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthModel } from '../models/auth.model';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../../environments/environment';

const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthRestService implements CanActivate {
  private baseUrl = environment.url_api;
  @Output() loginEmitter = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(loginForm: AuthModel) {
    const { email, password } = loginForm;

    return this.http.post(
      this.baseUrl + '/auth/login',
      {
        email,
        password,
      },
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
  }

  register(registerData: any) {
    const { userName, email, password } = registerData;

    return this.http.post(
      this.baseUrl + '/auth/register',
      {
        userName,
        email,
        password,
      },
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
  }

  redirectAfterLogin(route: any) {
    const goTo = route.queryParams.returnUrl;
    if (goTo) {
      this.router.navigate([goTo]);
    } else {
      this.router.navigate(['/']);
    }
  }

  makeLoginTextError(error: any) {
    switch (error.status) {
      case 400:
        return 'No se han enviado el usuario o la contraseña';

      case 401:
        return 'El usuario o la contraseña son incorrectos';

      case 500:
        return 'El servidor no se encuentra disponible';

      default:
        return 'Ha ocurrido un error';
    }
  }

  storeAccessToken(res: HttpResponse<any>) {
    const accessToken = res.headers.get('Authorization');
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      this.loginEmitter.emit(true);
    }
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.loginEmitter.emit(false);
  }

  isLogged() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!token;
  }

  provideToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    switch (state.url) {
      case '/booking': {
        if (this.isLogged()) {
          return true;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }
      case '/login':
      case '/registro': {
        if (this.isLogged()) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      }
      default:
        return true;
    }
  }
}
