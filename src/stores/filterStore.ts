import axios from '../plugins/axios';
import {defineStore} from 'pinia';

interface Filter {
	attribute_id: number;
	attribute_name: string;
	attribute_values: {label: string; value: string}[];
}

export const useFilterStore = defineStore('FilterStore', {
	state: () => ({
		FilterData: [] as Filter[],
	}),

	actions: {
		async getFilter() {
			return new Promise<Filter[]>(async (resolve, reject) => {
				try {
					const {data} = await axios.get<Filter[]>('/api/Filter');

					this.FilterData = data;

					resolve(data);
				} catch (error) {
					console.error('Error fetching filters:', error);
					reject(error);
				}
			});
		},
	},
});
