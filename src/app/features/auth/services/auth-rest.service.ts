import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthModel } from '../models/auth.model';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../../environments/environment';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_DATA_KEY = 'user_data';

@Injectable({
  providedIn: 'root',
})
export class AuthRestService implements CanActivate {
  private baseUrl = environment.url_api;
  @Output() loginEmitter = new EventEmitter<boolean>();
  @Output() userDataEmitter = new EventEmitter<any>();

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
    const { name, email, password } = registerData;

    return this.http.post(
      this.baseUrl + '/auth/register',
      {
        name,
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
    const accessToken = res.body?.data?.token;
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
  }

  storeUserData(res: HttpResponse<any>) {
    const data = res.body?.data;
    const rawUser = data?.user ?? null;
    if (!data && !rawUser) return;

    const normalizedUser = {
      ...(rawUser ?? {}),
      name: rawUser?.name ?? data?.name ?? null,
      email: rawUser?.email ?? data?.email ?? null,
      id: rawUser?.id ?? rawUser?._id ?? data?.id ?? data?._id ?? null,
      _id: rawUser?._id ?? rawUser?.id ?? data?._id ?? data?.id ?? null,
    };

    localStorage.setItem(USER_DATA_KEY, JSON.stringify(normalizedUser));
    this.userDataEmitter.emit(normalizedUser);
    this.loginEmitter.emit(true);
  }

  setUserData(userData: any) {
    if (!userData) return;

    const current = this.getUserData() ?? {};
    const merged = {
      ...current,
      ...userData,
    };

    localStorage.setItem(USER_DATA_KEY, JSON.stringify(merged));
    this.userDataEmitter.emit(merged);
  }

  getUserData() {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    this.loginEmitter.emit(false);
    this.userDataEmitter.emit(null);
  }

  isLogged() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!token;
  }

  provideToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getUserIdFromToken() {
    const token = this.provideToken();
    if (!token) return null;

    const payload = this.decodeJwtPayload(token);
    if (!payload || typeof payload !== 'object') return null;

    const id = (payload as any).id ?? (payload as any).userId ?? (payload as any).sub ?? null;
    return typeof id === 'string' && id.length ? id : null;
  }

  private decodeJwtPayload(token: string) {
    const parts = token.split('.');
    if (parts.length < 2) return null;

    try {
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const json = decodeURIComponent(
        atob(padded)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    switch (state.url) {
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
