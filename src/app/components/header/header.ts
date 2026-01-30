import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthRestService } from '../../features/auth/services/auth-rest.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  isLogged: boolean = false;

  constructor(private authRestService: AuthRestService) {}

  ngOnInit() {
    this.isLogged = this.authRestService.isLogged();
    const userData = this.authRestService.getUserData();
    this.userName = userData ? userData.name || userData.email : null;

    this.authRestService.loginEmitter.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.authRestService.userDataEmitter.subscribe((newUserData: any) => {
      this.userName = newUserData ? newUserData.name || newUserData.email : null;
    });
  }
}
