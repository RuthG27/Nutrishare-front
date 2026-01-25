import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRestService } from '../../../features/auth/services/auth-rest.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm = {
    userName: '',
    email: '',
    password: '',
  };
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthRestService,
    private router: Router,
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.registerForm.userName || !this.registerForm.email || !this.registerForm.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerForm.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm).subscribe({
      next: (response) => {
        this.successMessage = '¡Cuenta creada con éxito!';
        this.isLoading = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = this.makeRegisterErrorText(error);
        this.isLoading = false;
      },
    });
  }

  makeRegisterErrorText(error: any) {
    switch (error.status) {
      case 400:
        return 'Datos de registro inválidos';

      case 409:
        return 'El usuario o email ya existe';

      case 500:
        return 'El servidor no se encuentra disponible';

      default:
        return 'Ha ocurrido un error al registrarse';
    }
  }
}
