import axios from '../plugins/axios';
import type {AuctionDetailData} from '@/types';
import {defineStore} from 'pinia';

export interface Auction {
	page: number;
	totalPage: number;
	totalItem: number;
	items: items[];
}
export type items = {
	auction_id: number;
	product_id: number;
	start_price: number;
	price_step: number;
	duration: number;
	start_time: string;
	finished: true | false;
	product: {
		product_id: number;
		product_name: string;
		price: number;
		auther_id: string;
		description: string;
		category: Category;
		author: author;
		productImages: ProductImages[];
		tags: Tags[];
		productAttributes: ProductAttributes[];
	};
};

export type Category = {
	category_id: number;
	category_name: string;
	category_description: string;
};

export type ProductImages = {
	image_id: number;
	product_id: number;
	image_url: string;
	image_grid: number | null;
};

export type Tags = {
	tag_id: number;
	tag_name: string;
};

export type ProductAttributes = {
	attribute_id: number;
	product_id: number;
	attribute_name: string;
	attribute_value: string;
	attribute_label: string;
};
export type author = {
	author_id: number;
	author_name: string;
};

interface AuctionParams {
	id?: string;
}

export const useAuctionStore = defineStore('AuctionStore', {
	state: () => ({
		AuctionData: {} as Auction,
		AuctionDetailData: {} as AuctionDetailData,
		loading: false,
	}),

	actions: {
		async getAuction() {
			return new Promise<Auction>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<Auction>('/auction/all');

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
