<script setup lang="ts">
import TheHeader from '../components/theHeader.vue';
import {computed, onMounted, ref, type Ref} from 'vue';
import ZoomableImage from '../components/zoomImage.vue';
import {Check, ChevronsUpDown} from 'lucide-vue-next';
import {useGlobalLoader} from 'vue-global-loader';
import {cn} from '../lib/utils';
import {Button} from '@/components/ui/button';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '../components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '../components/ui/popover';
import {Checkbox} from '@/components/ui/checkbox';
import {useCategoryStore} from '@/stores/categoryStore';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {useFilterStore} from '@/stores/filterStore';
import {useProductStore} from '@/stores/productStore';
import {
	Pagination,
	PaginationEllipsis,
	PaginationFirst,
	PaginationLast,
	PaginationList,
	PaginationListItem,
	PaginationNext,
	PaginationPrev,
} from '@/components/ui/pagination';
import type {FilterType} from '@/types';
import {convertCoin} from '@/components/func/convertCoin';

const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const currentPage = ref(1);
const CategoryStore = useCategoryStore();
const FilterStore = useFilterStore();
const ProductStore = useProductStore();

const fetchcategories = async () => {
	try {
		displayLoader();
		await CategoryStore.getCategory();
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const fetchFilters = async () => {
	try {
		displayLoader();
		await FilterStore.getFilter();
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const fetchProducts = async () => {
	try {
		displayLoader();
		await ProductStore.getProduct({
			product_name: inputproductname.value,
			page: currentPage.value,
			styles: filers.value.Style,
			category_name: selectcategoryname.value,
			sizes: filers.value.Size,
			materials: filers.value.Material,
			subjects: filers.value.Subject,
			price: selectedPriceRange.value,
		});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const products = computed(() => ProductStore.productData);
const categories = computed(() => CategoryStore.categoryData);
const filters = computed(() => FilterStore.FilterData);

const open = ref(false);
const inputproductname = ref('');
const selectcategoryname = ref('');
const selectedPriceRange = ref<string>('');

const filers = ref<FilterType>({
	Style: [],
	Subject: [],
	Material: [],
	Size: [],
});

const handleFilterChange = (attributeName: string, attributeValue: string, isChecked: boolean) => {
	if (isChecked && !filers.value[attributeName].includes(attributeValue)) {
		filers.value[attributeName].push(attributeValue);
	} else if (!isChecked && filers.value[attributeName].includes(attributeValue)) {
		filers.value[attributeName] = filers.value[attributeName].filter((style) => style !== attributeValue);
	}
};

let imageHeight: number = 0;

onMounted(async () => {
	await Promise.all([fetchcategories(), fetchFilters(), fetchProducts()]);
});
</script>

<template>
	<TheHeader />
	<div class="px-6 my-4">
		<div class="px-6 flex flex-col items-center">
			<div class="flex w-full items-center">
				<h1 class="text-xl grow">Original Drawings For Sale</h1>
				<div></div>
			</div>
			<hr class="my-6 w-full border-gray-200 sm:mx-auto lg:my-4" />
			<div class="mt-4 mx-auto max-w-screen-2xl flex-col">
				<div class="h-full">
					<h1 class="max-w-xl break-all">
						Choose from a wide-ranging selection of 74,623 original drawings and prints ranging in subject, style and media from
						figurative to abstract, monochromatic to multicoloured, and charcoal to pencil.
					</h1>
				</div>
			</div>
			<hr class="my-6 w-full border-gray-200 sm:mx-auto lg:my-4" />
		</div>
		<div class="flex items-start min-h-80 mb-12">
			<div class="flex flex-col w-1/4 mr-7">
				<div class="demo-collapse items-center">
					<p class="text-base font-normal tracking-2 cursor-pointer uppercase mt-0">category</p>
					<Popover v-model:open="open">
						<PopoverTrigger as-child>
							<Button variant="outline" role="combobox" :aria-expanded="open" class="w-[300px] mt-4 justify-between">
								{{ selectcategoryname || 'Select category...' }}
								<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent class="w-[300px] p-0">
							<Command>
								<CommandInput class="h-9" placeholder="Search category..." />
								<CommandEmpty>No framework found.</CommandEmpty>
								<CommandList>
									<CommandGroup>
										<CommandItem
											v-for="framework in categories"
											:key="framework.category_id"
											:value="framework.category_name"
											@select="
												() => {
													selectcategoryname = framework.category_name;

													fetchProducts();
													open = false;
												}
											"
										>
											{{ framework.category_name }}
											<Check
												:class="
													cn(
														'ml-auto h-4 w-4',
														selectcategoryname === framework.category_name ? 'opacity-100' : 'opacity-0'
													)
												"
											/>
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					<Accordion type="multiple" class="w-full">
						<AccordionItem v-for="item in filters" :key="item.attribute_id" :value="item.attribute_name">
							<AccordionTrigger>{{ item.attribute_name }}</AccordionTrigger>
							<AccordionContent>
								<div v-for="valueItem in item.attribute_values" :key="valueItem.value" class="flex items-center space-x-3">
									<Checkbox
										:id="valueItem.value"
										:value="valueItem.value"
										:checked="filers[item.attribute_name].includes(valueItem.value)"
										@update:checked="
											async (checked) => {
												handleFilterChange(item.attribute_name, valueItem.value, checked);

												fetchProducts();
											}
										"
									/>
									<label :for="valueItem.value" class="font-normal">{{ valueItem.label }}</label>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
			<div class="flex flex-col w-full">
				<!-- Kiểm tra biến noProducts để hiển thị thông báo hoặc danh sách sản phẩm -->
				<div v-if="products.totalCount == 0" class="w-full flex flex-col mt-6 items-center justify-center">
					<p class="text-2xl font-semibold text-gray-600">No products found.</p>
					<p class="text-gray-500">Please try different filters or categories.</p>
				</div>
				<div v-else>
					<div class="grid grid-cols-auto gap-y-0 w-full auto-rows-25 overflow-visible">
						<figure
							v-for="item in products.products"
							class="relative mb-2.5 min-w-full flex flex-col justify-start items-center break-before-avoid"
							:key="item.product_id"
							:id="'figure_' + item.product_id"
							:style="'grid-row-end: span ' + item.productImages[0].image_grid + ';'"
						>
							<div class="w-80 inline-block relative">
								<router-link to="/">
									<ZoomableImage :src="item.productImages[0].image_url" :figureId="'figure_' + item.product_id" />
								</router-link>
							</div>
							<div
								class="w-80 flex items-start flex-col mt-5 text-base whitespace-nowrap overflow-hidden leading-4 text-ellipsis"
							>
								<div class="mb-2 flex flex-row items-start w-full">
									<div class="flex flex-col items-start">
										<router-link
											:to="{name: 'product-detail', params: {id: item.product_id}}"
											class="whitespace-nowrap w-full text-base text-ellipsis m-0 overflow-hidden hover:underline"
										>
											<span>{{ item.product_name }}</span>
										</router-link>
										<p class="text-xs leading-4 whitespace-nowrap text-ellipsis m-0 overflow-hidden">
											<span class="">{{
												item.productAttributes.find((att) => att.attribute_name === 'Size')?.attribute_label
											}}</span>
										</p>
									</div>
								</div>
								<div class="mb-2 flex flex-row items-center w-full">
									<div class="flex flex-col items-start w-3/5">
										<p class="whitespace-nowrap w-full text-sm text-ellipsis m-0 overflow-hidden">
											<span>{{ item.author.author_name }} </span>
										</p>
									</div>

									<div class="flex whitespace-nowrap items-end flex-col w-2/5">
										<p class="whitespace-nowrap m-0 text-ellipsis text-xs leading-4">
											<span class="font-semibold text-base"> {{ convertCoin(item.price) }} </span> VND
										</p>
									</div>
								</div>
							</div>
						</figure>
					</div>
					<div class="mx-auto justify-center flex">
						<Pagination v-slot="{page}" :total="products.totalCount" :items-per-page="15" :default-page="1">
							<PaginationList v-slot="{items}" class="flex items-center gap-1">
								<PaginationFirst
									@click="
										async () => {
											currentPage = 1;
											await fetchProducts();
										}
									"
								/>
								<PaginationPrev
									@click="
										async () => {
											currentPage = currentPage - 1;
											await fetchProducts();
										}
									"
								/>
								<template v-for="(item, index) in items">
									<PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
										<Button
											class="w-10 h-10 p-0"
											:variant="item.value === page ? 'default' : 'outline'"
											@click="
												async () => {
													currentPage = item.value;
													await fetchProducts();
												}
											"
										>
											{{ item.value }}
										</Button>
									</PaginationListItem>
									<PaginationEllipsis v-else :key="item.type" :index="index" />
								</template>
								<PaginationNext
									@click="
										async () => {
											currentPage = currentPage + 1;
											await fetchProducts();
										}
									"
								/>
								<PaginationLast
									@click="
										async () => {
											currentPage = products.totalPage;
											await fetchProducts();
										}
									"
								/>
							</PaginationList>
						</Pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
