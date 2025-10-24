"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const ws_1 = __importDefault(require("ws"));
class Chat {
    constructor() {
        this.ws = null;
    }
    connect(wsurl) {
        this.ws = new ws_1.default(wsurl);
        this.ws.onopen = () => {
            this.onConnectionStatus?.('connected');
        };
        this.ws.onerror = (error) => {
            this.onConnectionStatus?.('error', error);
        };
        this.ws.onclose = () => {
            this.onConnectionStatus?.('disconnected');
        };
        this.ws.onmessage = (event) => {
            // In Node/ws the event.data can be a Buffer; normalize to string
            const raw = typeof event.data === 'string' ? event.data : event.data.toString();
            try {
                const parsedData = JSON.parse(raw);
                this.onMessage?.(parsedData);
            }
            catch (e) {
                this.onMessage?.(raw);
            }
        };
    }
    sendMessage(message) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            this.ws.send(message);
            return true;
        }
        else {
            this.onConnectionStatus?.('not_connected', { state: this.getConnectionState() });
            return false;
        }
    }
    getConnectionState() {
        if (!this.ws)
            return 'Not initialized';
        switch (this.ws.readyState) {
            case ws_1.default.CONNECTING:
                return 'CONNECTING';
            case ws_1.default.OPEN:
                return 'OPEN';
            case ws_1.default.CLOSING:
                return 'CLOSING';
            case ws_1.default.CLOSED:
                return 'CLOSED';
            default:
                return 'UNKNOWN';
        }
    }
}
exports.Chat = Chat;
//# sourceMappingURL=chat.js.map