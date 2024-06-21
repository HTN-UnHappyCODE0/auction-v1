import type {APIResponse, ProductData} from '@/types';
import axios from '../plugins/axios';
import {defineStore} from 'pinia';

interface ProductFilterParams {
	product_name?: string;
	category_name?: string;
	page?: number;
	price?: string;
	sizes?: string[];
	styles?: string[];
	subjects?: string[];
	materials?: string[];
}

export const useProductStore = defineStore('ProductStore', {
	state: () => ({
		productData: {} as ProductData,
		loading: false,
	}),

	actions: {
		async getProduct(params: ProductFilterParams) {
			try {
				this.loading = true;

				// Xây dựng query string
				const queryString = Object.entries(params)
					.filter(([_, value]) => value !== undefined && value !== '')
					.flatMap(([key, value]) => {
						// Kiểm tra nếu giá trị là một mảng
						if (Array.isArray(value)) {
							return value.map((v) => `${key}=${encodeURIComponent(v)}`);
						}
						return `${key}=${encodeURIComponent(value as string)}`;
					})
					.join('&');

				// Gọi API với query string
				const data: any = await axios.get<APIResponse<ProductData>>(`/api/Product/filter?${queryString}`);

				// Cập nhật state với dữ liệu nhận được
				this.productData = data.data;
				console.log('PRODUCT DATA', this.productData);
			} catch (error) {
				console.error('Failed to fetch product data:', error);
				throw error;
			} finally {
				this.loading = false;
			}
		},
	},
});
