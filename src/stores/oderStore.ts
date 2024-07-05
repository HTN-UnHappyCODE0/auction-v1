import type {OrderListData} from '@/types';
import axios from '../plugins/axios';
import {defineStore} from 'pinia';
import router from '@/router';

export const useOrderStore = defineStore('orderStore', {
	state: () => ({
		OrderData: [] as OrderListData[],
	}),

	actions: {
		async createOrder(product_id: number) {
			return new Promise<void>(async (resolve, reject) => {
				try {
					if (!isLoggedIn()) {
						alert('Please log in to continue');
						router.push('/auth/login');
						return;
					}

					await axios.post('/api/Order/user-create-order', {
						product_id,
					});

					resolve();
				} catch (error) {
					reject(error);
				}
			});
		},
		async getAllOrder() {
			return new Promise<OrderListData[]>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<OrderListData[]>('/api/Order/all-oders');
					this.OrderData = data;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
	},
});

function isLoggedIn() {
	return localStorage.getItem('currentAuthTokens') !== null;
}
