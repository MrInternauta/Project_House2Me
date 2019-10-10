import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public salas:any = [
    {id: 1,on: 1, tipo: "comedor", status:"light", sala:"Comedor", tmp:27.8},
    {id: 2,on: 1, tipo: "reca", status:"light", sala:"Recamara 1", tmp:24.1},
    {id: 3,on: 1, tipo: "reca", status:"light", sala:"Recamara 2", tmp:23.5},
    {id: 4,on: 1, tipo: "sala", status:"light", sala:"Sala", tmp:25.0},
    {id: 5,on: 1, tipo: "cocina", status:"light", sala:"Cocina", tmp:29.2},
    {id: 6,on: 1, tipo: "banio", status:"light", sala:"Baño", tmp:27.1}
  ]

  constructor() { }
}
