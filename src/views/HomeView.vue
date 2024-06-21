<template>
	<div>
		<button @click="fetchProductData">Fetch Product Data</button>
		<div v-if="loading">Loading...</div>
		<div v-else>
			<!-- Hiển thị dữ liệu sản phẩm ở đây -->
		</div>
	</div>
</template>

<script setup lang="ts">
import {useProductStore} from '@/stores/productStore';
import {computed, onMounted, ref, type Ref} from 'vue';

const store = useProductStore();

const fetchProductData = async () => {
	try {
		await store.getProduct({product_name: '', page: 1});
	} catch (error) {
		console.error('Failed to fetch product data in component:', error);
	}
};

onMounted(() => {
	fetchProductData();
});

const loading = store.loading;
</script>
