import axios from '../plugins/axios';
import type {AuctionAllData, AuctionDetailData} from '@/types';
import {defineStore} from 'pinia';

interface AuctionParams {
	id?: string;
}

export const useAuctionStore = defineStore('AuctionStore', {
	state: () => ({
		AuctionData: {} as AuctionAllData,
		AuctionDetailData: {} as AuctionDetailData,
		loading: false,
	}),

	actions: {
		async getAuction() {
			return new Promise<AuctionAllData>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<AuctionAllData>('/auction/all');

					this.AuctionData = data;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
		async getAuctionDetail({id}: AuctionParams) {
			return new Promise<AuctionDetailData>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<AuctionDetailData>(`/auction?id=${id}`);

					this.AuctionDetailData = data;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
	},
});
