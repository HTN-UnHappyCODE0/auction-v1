<template>
	<RouterLink to="/" class="inline-flex items-center text-2xl font-bold text-gray-500">
		<svg class="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
			<path
				d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z"
			/>
		</svg>
		Auction
	</RouterLink>
</template>

<script setup lang="ts">
import {RouterLink, useRouter} from 'vue-router';
</script>
