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

  on(event:string, callback:any) {
    this.socketClient.on(event, callback);
  }

  emit(event:string, data:any) {
    this.socketClient.emit(event, data);
  }

  disconnect() {
      if(this.socketClient && this.socketClient.connected) {
        this.socketClient.disconnect();
      }
  }
}
