import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthRestService } from '../../auth/services/auth-rest.service';

@Injectable({
  providedIn: 'root',
})
export class UserRestService {
  private baseUrl = environment.url_api;

  constructor(
    private http: HttpClient,
    private authRestService: AuthRestService,
  ) {}

  updateUser(userId: string, userUpdate: any) {
    const token = this.authRestService.provideToken();

    return this.http.put(this.baseUrl + `/users/${userId}`, userUpdate, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(token ? { 'x-access-token': token } : {}),
      },
    });
  }

  updateMe(userUpdate: any) {
    const token = this.authRestService.provideToken();

    return this.http.put(this.baseUrl + `/users/me`, userUpdate, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(token ? { 'x-access-token': token } : {}),
      },
    });
  }

  deleteMe() {
    const token = this.authRestService.provideToken();

    return this.http.delete(this.baseUrl + `/users/me`, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(token ? { 'x-access-token': token } : {}),
      },
    });
  }
}
