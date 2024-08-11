import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'CardMobile',
  standalone: true,
  imports: [],
  templateUrl: './card-mobile.component.html',
  styleUrl: './card-mobile.component.scss'
})
export class CardMobileComponent implements OnInit{
  
  logoCordova: boolean = false;

  ngOnInit(): void {
    setInterval(() => {
      this.logoCordova = !this.logoCordova;
    }, 1E4)
  }
}
