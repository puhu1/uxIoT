import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  seat;
  user = JSON.parse(localStorage.getItem('user'));
  setSeat(seat){
    this.seat = seat;
  }

  getSeat(){
    return this.seat;
  }
}
