import type {UserInfoData} from '@/types';
import axios from '../plugins/axios';
import {defineStore} from 'pinia';

export const useUserStore = defineStore('UserStore', {
	state: () => ({
		UserData: {} as UserInfoData,
		loading: false,
	}),

	actions: {
		async getUserInfo() {
			return new Promise<UserInfoData>(async (resolve, reject) => {
				try {
					this.loading = true;
					const {data} = await axios.get<UserInfoData>('/api/User/info');
					console.log('user', data);

					this.UserData = data;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
	},
});
