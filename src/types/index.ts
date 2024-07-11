type PaginationContent = {page: number; totalPage: number};

export interface APIResponse<T> {
	data: T;
	message: string;
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

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

export type ProductData = {
	products: {
		product_id: number;
		product_name: string;
		price: number;
		auther_id: string;
		popularity: number;
		description: string;
		category: Category;
		author: author;
		productImages: ProductImages[];
		tags: Tags[];
		productAttributes: ProductAttributes[];
	}[];
	page: number;
	totalPage: number;
	totalCount: number;
};

export type ProductDetailData = {
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

export type AuctionDetailData = {
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
};

export type UserInfoData = {
	id: string;
	username: string;
	userProfile: {
		profile_id: number;
		user_id: string;
		fullname: string;
		phone: string;
		email: string;
		address: string;
		avatar_url: string;
	};
};

export type FilterType = Record<string, string[]>;

export type UserProfile = {
	profile_id: number;
	user_id: string;
	fullname: string;
	phone: string;
	email: string;
	address: string;
	avatar_url: string;
};

export type OrderListData = {
	user_id: string;
	order_id: number;
	status: number;
	order_date: string;
	order_detail_id: number;
	order_detail: {
		order_detail_id: number;
		product_id: number;
		order_id: number;
		product: {
			product_id: number;
			category_id: number;
			author_id: number;
			product_name: string;
			price: number;
			description: string;
			author: {
				author_id: number;
				author_name: string;
			};
			category: {
				category_id: number;
				category_name: string;
				category_description: string;
			};
			productImages: productImages[];
			tags: [
				{
					tag_id: number;
					tag_name: string;
				},
			];
			productAttributes: [];
		};
	};
};

export type productAttributes = {
	product_id: number;
	attribute_id: number;
	attribute_name: string;
	attribute_label: string;
	attribute_value: string;
};

export type productImages = {
	image_id: number;
	product_id: number;
	image_url: string;
};
export type WsToken = {socketToken: string};

export type AuctionAllData = {
	page: number;
	totalPage: number;
	totalItem: number;
	items: AuctionData[];
};

export type AuctionData = {
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
