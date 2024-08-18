import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImmaginiService {

  immaginePrecedente?: number;
  immagineSelezionata: number = 0;
  
}
