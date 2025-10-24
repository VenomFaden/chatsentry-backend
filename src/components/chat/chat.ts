
import WebSocket from 'ws';

export class Chat {
    private ws: WebSocket | null = null;

    constructor() {
    }

    onMessage?: (data: any) => void;
    onConnectionStatus?: (status: string, error?: any) => void;

    connect(wsurl: string): void {
        this.ws = new WebSocket(wsurl);
        
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
            const raw = typeof (event as any).data === 'string' ? (event as any).data : (event as any).data.toString();
            try {
                const parsedData = JSON.parse(raw);
                this.onMessage?.(parsedData);
            } catch (e) {
                this.onMessage?.(raw);
            }
        };
    }

    sendMessage(message: string): boolean {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
            return true;
        } else {
            this.onConnectionStatus?.('not_connected', { state: this.getConnectionState() });
            return false;
        }
    }
    close(): void {
        this.ws?.close();
    }

    private getConnectionState(): string {
        if (!this.ws) return 'Not initialized';
        switch (this.ws.readyState) {
            case WebSocket.CONNECTING:
                return 'CONNECTING';
            case WebSocket.OPEN:
                return 'OPEN';
            case WebSocket.CLOSING:
                return 'CLOSING';
            case WebSocket.CLOSED:
                return 'CLOSED';
            default:
                return 'UNKNOWN';
        }
    }
}