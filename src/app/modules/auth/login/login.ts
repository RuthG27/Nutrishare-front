import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRestService } from '../../../features/auth/services/auth-rest.service';
import { AuthModel } from '../../../features/auth/models/auth.model';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: AuthModel = {
    email: '',
    password: '',
  };
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthRestService) {}

  onSubmit() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.loginForm.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.loginForm).subscribe({
      next: (response) => {
        this.authService.storeAccessToken(response);
        this.successMessage = '¡Inicio de sesión exitoso!';
        this.isLoading = false;

        setTimeout(() => {
          this.authService.redirectAfterLogin({ queryParams: {} });
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = this.authService.makeLoginTextError(error);
        this.isLoading = false;
      },
    });
  }
}
