import { Component } from '@angular/core';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  Scrolla(s: string){
    const el = document.getElementById(s)!;
    el.scrollIntoView({behavior: "smooth"})
  }
}
