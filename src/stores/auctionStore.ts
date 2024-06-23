import axios from '../plugins/axios';
import type {AuctionDetailData} from '@/types';
import {defineStore} from 'pinia';

export interface Auction {
	auction_id: number;
	product_id: number;
	start_price: number;
	price_step: number;
	duration: number;
	current_price: number;
	sold_price: number;
	user_id_win: string;
	start_time: string;
	end_time: string | null;
}

interface AuctionParams {
	id?: string;
}

export const useAuctionStore = defineStore('AuctionStore', {
	state: () => ({
		AuctionData: [] as Auction[],
		AuctionDetailData: {} as AuctionDetailData,
		loading: false,
	}),

	actions: {
		async getAuction() {
			return new Promise<Auction[]>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<Auction[]>('/auctions');

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
