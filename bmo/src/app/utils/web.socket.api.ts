import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { environment } from 'src/environments/environment';

export class WebSocketAPI {
    topic = '/topic/conversation';
    stompClient: any;
    message: any;

    constructor(private appComponent: AppComponent) {}

    connect() {
        console.log('Initialize WebSocket Connection');
        const ws = new SockJS(environment.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, (frame) => {
            _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    send(message) {
        console.log('calling logout api via web socket');
        this.stompClient.send('/app/hello', {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log('Message Received from Server :: ' + message);
        this.appComponent.handleMessage(JSON.stringify(message.body));
    }

    errorCallBack(error) {
        console.log('errorCallBack -> ' + error);
        setTimeout(() => {
            this.connect();
        }, 5000);
    }
}
