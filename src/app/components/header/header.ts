import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  // RouterModule permite la navegación entre las páginas
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
