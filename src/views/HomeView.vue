<!-- src/components/MyWebSocketComponent.vue -->
<template>
	<div>
		<h1>WebSocket Example</h1>
		<p v-if="websocketStore.isConnected">WebSocket connected</p>
		<p v-else>WebSocket disconnected</p>

		<input v-model="message" type="text" placeholder="Type your message here" />
		<button @click="sendMessage">Send Message</button>

		<div class="messages">
			<h2>Messages</h2>
			<ul>
				<li v-for="(msg, index) in websocketStore.messages" :key="index">{{ msg }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useWebSocketStore} from '@/stores/websocketStore';
import {ref, onMounted} from 'vue';

const websocketStore = useWebSocketStore();
const message = ref('');

onMounted(() => {
	websocketStore.connect('wss://echo.websocket.events'); // WebSocket echo server URL
});

const sendMessage = () => {
	websocketStore.sendMessage(message.value);
	message.value = ''; // Xóa trường nhập sau khi gửi tin nhắn
};
</script>

<style scoped>
.messages {
	margin-top: 20px;
}

.messages ul {
	list-style: none;
	padding: 0;
}

.messages li {
	padding: 5px 0;
	border-bottom: 1px solid #ccc;
}
</style>
