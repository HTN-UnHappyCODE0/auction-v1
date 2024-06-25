// src/stores/webSocketStore.ts
import {defineStore} from 'pinia';

export const useWebSocketStore = defineStore('webSocket', {
	state: () => ({
		websocket: null as WebSocket | null,
		isConnected: false as boolean,
		messages: [] as string[],
	}),
	actions: {
		connect(this: any, url: string) {
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
				const newMessage = JSON.parse(event.data);
				// console.log('newMessage:', newMessage.Message);
				// console.log('this.messages:', this.messages[this.messages.length - 1]);

				if (newMessage.Message !== this.messages[this.messages.length - 1]) {
					this.messages.push(newMessage.Message);
				}
				// this.messages.push(`Received: ${JSON.parse(event.data).Message}`);
			};

			this.websocket.onerror = (error: any) => {
				console.error('WebSocket error:', error);
			};
		},

		disconnect(this: any) {
			if (this.websocket) {
				this.websocket.close();
				this.websocket = null;
			}
		},

		sendMessage(this: any, message: string) {
			if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
				this.websocket.send(message);
				// this.messages.push(`Sent: ${message}`);
			} else {
				console.error('WebSocket is not connected');
			}
		},
	},
});
