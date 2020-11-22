import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as socketIO from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socketClient;

  constructor() { }

  connect() {
    this.socketClient = socketIO.io(environment.socketUrl);
  }

  on() {

  }

  emit() {

  }

  disconnect() {
    
  }
}
