import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PaginaPrincipaleComponent } from "./pagina-principale/pagina-principale.component";
import { PaginaConoscenzeComponent } from './pagina-conoscenze/pagina-conoscenze.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PaginaPrincipaleComponent, PaginaConoscenzeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Progetto';
}
