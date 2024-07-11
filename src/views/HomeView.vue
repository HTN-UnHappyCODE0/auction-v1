<script setup lang="ts">
import TheHeader from '../components/theHeader.vue';
import TheFooter from '../components/theFooter.vue';
import Autoplay from 'embla-carousel-autoplay';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import {Card, CardContent} from '@/components/ui/card';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {useProductStore} from '@/stores/productStore';
import {useGlobalLoader} from 'vue-global-loader';
import {computed, onMounted} from 'vue';
import {useAuctionStore} from '@/stores/auctionStore';
import moment from 'moment';
import {convertCoin} from '@/components/func/convertCoin';

const plugin = Autoplay({
	delay: 2000,
	stopOnMouseEnter: true,
	stopOnInteraction: false,
});
const productStore = useProductStore();
const AuctionStore = useAuctionStore();
const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const fetchProducts = async () => {
	try {
		displayLoader();
		await productStore.getProduct({});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};
const fetchAuctions = async () => {
	try {
		displayLoader();
		await AuctionStore.getAuction();
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};
const fetchProductPopularity = async () => {
	try {
		displayLoader();
		await productStore.getProductPopularity();
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};
const productData = computed(() => productStore.productData);
const auctionsData = computed(() => AuctionStore?.AuctionData);
const productPopularity = computed(() => productStore.ProductPopularity);
onMounted(async () => {
	await Promise.all([fetchProducts(), fetchProductPopularity(), fetchAuctions()]);
});

const formatDate = (date: any) => {
	return moment(date).format('HH:mm DD/MM/YYYY');
};

const calculateEndTime = (startTime: any, duration: number) => {
	return moment(startTime).add(duration, 'minutes').format('HH:mm DD/MM/YYYY');
};
</script>

<template>
	<TheHeader />
	<div class="w-full flex justify-center">
		<Carousel
			class="relative w-full max-h-xl max-h-96"
			:plugins="[plugin]"
			@mouseenter="plugin.stop"
			@mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
		>
			<CarouselContent class="w-full max-h-96">
				<CarouselItem v-for="(item, index) in productData.products" :key="item.product_id">
					<div class="p-1">
						<Card>
							<CardContent class="flex w-full aspect-square items-center max-h-96 justify-center">
								<ResizablePanelGroup
									id="handle-demo-group-1"
									direction="horizontal"
									class="max-h-96 w-full rounded-lg border"
								>
									<ResizablePanel id="handle-demo-panel-1" :default-size="40">
										<div class="flex h-full items-center justify-center">
											<img
												:src="item?.productImages[0]?.image_url"
												alt=""
												class="h-full w-full object-cover object-center lg:h-full lg:w-full"
											/>
										</div>
									</ResizablePanel>
									<ResizableHandle id="handle-demo-handle-1" with-handle />
									<ResizablePanel id="handle-demo-panel-2" :default-size="60">
										<div class="flex h-full flex-col items-center justify-center px-5">
											<span class="font-semibold text-3xl max-w-96">{{ item?.product_name }}</span>
											<div class="max-w-96 mt-5">{{ item?.description }}</div>
											<router-link
												:to="{name: 'product-detail', params: {id: item?.product_id}}"
												class="text-black border w-full bg-white hover:bg-blue-600 font-medium rounded-full text-sm px-5 py-2.5 max-w-96 text-center me-2 mb-2 mt-5 hover:underline hover:text-white"
											>
												View Product
											</router-link>
										</div>
									</ResizablePanel>
								</ResizablePanelGroup>
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	</div>
	<div class="mx-auto px-5 my-10">
		<h1 class="font-medium text-2xl mx-0 text-start">Featured</h1>
		<h1 class="font-normal text-xl mx-0 text-start text-gray-500">Products that receive the most attention</h1>
		<div class="relative">
			<ul
				class="mt-5 pb-8 px-[vw] w-full flex gap-5 snap-x scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-x-auto"
			>
				<li v-for="(item, index) in productPopularity.products" :key="index" class="snap-align-none">
					<div class="group max-w-72 relative">
						<div class="w-72 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-60">
							<img
								:src="item.productImages[0].image_url"
								alt=""
								class="h-full w-full object-cover object-center lg:h-full lg:w-full"
							/>
						</div>
						<div class="mt-4 flex flex-col truncate max-w-64 text-start justify-start">
							<h3 class="text-xl font-medium text-gray-800">
								<router-link :to="{name: 'product-detail', params: {id: item.product_id}}">
									<span aria-hidden="true" class="absolute text-ellipsis overflow-hidden inset-0 hover:underline"></span>
									{{ item.product_name }}
								</router-link>
							</h3>
						</div>
						<h1 class="text-base text-gray-500 truncate italic">
							{{ item?.author?.author_name }}
						</h1>
						<h1 class="text-sm text-gray-500 truncate">
							{{ item?.description }}
						</h1>
						<div class="text-sm font-medium">{{ convertCoin(item.price) }} VND</div>
					</div>
				</li>
			</ul>
		</div>
		<hr class="border-gray-200 mx-10 mb-8 xl:ml-0" />
	</div>
	<div class="mx-auto px-5">
		<div class="flex justify-between items-center">
			<h1 class="font-medium text-2xl mx-0 text-start">
				Artwork
				<div class="inline align-super text-base text-blue-600">{{ productData?.totalCount }}</div>
			</h1>
			<router-link to="/product"><h1 class="hover:underline hover:cursor-pointer">View All Artwork</h1></router-link>
		</div>
		<div class="grid gap-5 grid-cols-12 mt-5">
			<div class="col-span-6">
				<div v-for="(item, index) in productData?.products?.slice(1, 2)" :key="index" class="snap-align-none">
					<div class="group w-full relative">
						<div class="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-full">
							<img
								:src="item.productImages[0]?.image_url"
								alt=""
								class="h-full w-full object-cover object-center lg:h-full lg:w-full"
							/>
						</div>
						<div class="mt-4 flex flex-col truncate max-w-64 text-start justify-start">
							<h3 class="text-xl font-medium text-gray-800">
								<router-link :to="{name: 'product-detail', params: {id: item.product_id}}">
									<span aria-hidden="true" class="absolute text-ellipsis overflow-hidden inset-0 hover:underline"></span>
									{{ item.product_name }}
								</router-link>
							</h3>
						</div>
						<h1 class="text-base text-gray-500 truncate italic">
							{{ item.author?.author_name }}
						</h1>
						<h1 class="text-sm text-gray-500 truncate">
							{{ item.description }}
						</h1>
						<div class="text-sm font-medium">{{ convertCoin(item.price) }} VND</div>
					</div>
				</div>
			</div>
			<div class="col-span-6">
				<div class="columns-2 gap-3">
					<div v-for="(item, index) in productData?.products?.slice(2, 8)" :key="index" class="gap-5">
						<div class="w-full relative block mb-5">
							<div class="overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-60">
								<img :src="item?.productImages[0]?.image_url" alt="" class="h-full w-full object-cover object-center" />
							</div>
							<div class="mt-4 flex flex-col truncate text-start justify-start">
								<h3 class="text-xl font-medium text-gray-800">
									<router-link :to="{name: 'product-detail', params: {id: item.product_id}}">
										<span
											aria-hidden="true"
											class="absolute text-ellipsis overflow-hidden inset-0 hover:underline"
										></span>
										{{ item.product_name }}
									</router-link>
								</h3>
							</div>
							<h1 class="text-base text-gray-500 truncate italic">
								{{ item?.author?.author_name }}
							</h1>
							<h1 class="text-sm text-gray-500 truncate">
								{{ item?.description }}
							</h1>
							<div class="text-sm font-medium">{{ convertCoin(item.price) }} VND</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto px-5 my-10">
		<div class="flex justify-between items-center">
			<h1 class="font-medium text-2xl mx-0 text-start">
				At Auction
				<div class="inline align-super text-base text-blue-600">{{ auctionsData?.totalItem }}</div>
			</h1>
			<router-link to="/auction"><h1 class="hover:underline hover:cursor-pointer">View All Auctions</h1></router-link>
		</div>

		<div class="relative">
			<ul
				class="mt-5 pb-8 px-[vw] w-full flex gap-5 snap-x scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-x-auto"
			>
				<li v-for="(item, index) in auctionsData.items" :key="index" class="snap-align-none">
					<div class="group min-w-80 relative">
						<div class="w-96 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-72">
							<img
								:src="item?.product?.productImages[0]?.image_url"
								alt=""
								class="h-full w-full object-cover object-center lg:h-full lg:w-full"
							/>
						</div>
						<div class="mt-4 flex flex-col text-start justify-start">
							<h1 class="text-sm text-gray-500">Category: {{ item?.product?.category?.category_name }}</h1>
							<h3 class="text-xl font-medium text-gray-800">
								<router-link :to="{name: 'product-detail', params: {id: item.product_id}}">
									<span aria-hidden="true" class="absolute inset-0 hover:underline"></span>
									{{ item?.product.product_name }}
								</router-link>
							</h3>
							<h1 class="text-sm text-gray-500">
								{{ formatDate(item.start_time) }} - {{ calculateEndTime(item.start_time, item.duration) }}
							</h1>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<hr class="border-gray-200 mx-10 mb-8 xl:ml-0" />
	</div>
	<TheFooter />
</template>
