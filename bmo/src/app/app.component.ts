import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketAPI } from './utils/web.socket.api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bmo';

  webSocketAPI: WebSocketAPI;
  greeting: string;
  name: string;

  constructor() {}

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this);
    this.webSocketAPI._connect();
  }

  ngOnDestroy() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
  }
}
