import axios from '@/plugins/axios';
import type {WsToken} from '@/types';
import {defineStore} from 'pinia';

interface WebSocketMessage {
	Message: string;
	CurrentPrice: number;
}

export const useWebSocketStore = defineStore('webSocket', {
	state: () => ({
		websocket: null as WebSocket | null,
		isConnected: false as boolean,
		messages: [] as string[],
		currents: [] as number[],
		WsToken: {} as WsToken,
	}),
	actions: {
		connect(url: string) {
			this.websocket = new WebSocket(url);

			this.websocket.onopen = () => {
				console.log('WebSocket connected');
				this.isConnected = true;
			};

			this.websocket.onclose = () => {
				console.log('WebSocket disconnected');
				this.isConnected = false;
			};

			this.websocket.onmessage = (event: MessageEvent) => {
				console.log('Received:', event.data);
				const newMessage: WebSocketMessage = JSON.parse(event.data);
				this.processMessage(newMessage);
			};

			this.websocket.onerror = (error: any) => {
				console.error('WebSocket error:', error);
			};
		},

		disconnect() {
			if (this.websocket) {
				this.websocket.close();
				this.websocket = null;
			}
		},

		sendMessage(message: string) {
			if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
				this.websocket.send(message);
			} else {
				console.error('WebSocket is not connected');
			}
		},

		processMessage(message: WebSocketMessage) {
			if (message.Message !== this.messages[this.messages.length - 1]) {
				this.messages.push(message.Message);
			}
			if (message.CurrentPrice !== this.currents[this.currents.length - 1]) {
				this.currents.push(message.CurrentPrice);
			}
		},

		async generateToken() {
			return new Promise<WsToken>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<WsToken>('/generate-ws-token');

					this.WsToken = data;
					console.log('WsToken:', data);

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
	},
});
