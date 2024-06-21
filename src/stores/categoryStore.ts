import axios from '../plugins/axios';
import {defineStore} from 'pinia';

export interface Category {
	category_id: string;
	category_name: string;
	category_description: string;
}

export const useCategoryStore = defineStore('CategoryStore', {
	state: () => ({
		categoryData: [] as Category[],
	}),

	actions: {
		async getCategory() {
			return new Promise<Category[]>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<Category[]>('/api/Category');

					const formattedData = data.map((category) => ({
						...category,
						category_id: String(category.category_id),
					}));
					this.categoryData = formattedData;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
	},
});
