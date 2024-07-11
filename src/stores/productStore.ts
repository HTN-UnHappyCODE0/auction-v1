import type {APIResponse, ProductData, ProductDetailData} from '@/types';
import axios from '../plugins/axios';
import {defineStore} from 'pinia';

interface ProductFilterParams {
	product_name?: string;
	category_name?: string;
	autherproductname?: string;
	page?: number;
	price?: string;
	sizes?: string[];
	styles?: string[];
	subjects?: string[];
	materials?: string[];
}
interface ProductParams {
	id?: string;
}

export const useProductStore = defineStore('ProductStore', {
	state: () => ({
		productData: {} as ProductData,
		ProductPopularity: {} as ProductData,
		ProductDetailData: {} as ProductDetailData,
		loading: false,
		inputProductName: '',
	}),

	actions: {
		async getProduct(params: ProductFilterParams) {
			try {
				this.loading = true;

				const queryString = Object.entries(params)
					.filter(([_, value]) => value !== undefined && value !== '')
					.flatMap(([key, value]) => {
						if (Array.isArray(value)) {
							return value.map((v) => `${key}=${encodeURIComponent(v)}`);
						}
						return `${key}=${encodeURIComponent(value as string)}`;
					})
					.join('&');
				const data: any = await axios.get<APIResponse<ProductData>>(`/api/Product/filter?${queryString}`);

				this.productData = data.data;
			} catch (error) {
				console.error('Failed to fetch product data:', error);
				throw error;
			} finally {
				this.loading = false;
			}
		},
		async getProductPopularity() {
			return new Promise<ProductData>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<ProductData>('/api/Product/popularity/1');

					this.ProductPopularity = data;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},

		async getProductDetail({id}: ProductParams) {
			return new Promise<ProductDetailData>(async (resolve, reject) => {
				try {
					this.loading = true;
					const {data} = await axios.get<ProductDetailData>(`/api/Product/${id}`);

					this.ProductDetailData = data;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
		setInputProductName(productName: string) {
			this.inputProductName = productName;
		},
		getInputProductName() {
			return this.inputProductName;
		},
	},
});
