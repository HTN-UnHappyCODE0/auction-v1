<script setup lang="ts">
// import {Search, Sort} from '@element-plus/icons-vue';
import TheHeader from '../components/theHeader.vue';
import Logo from '@/components/iconLogo.vue';
import {useWebSocketStore} from '@/stores/websocketStore';
import {useAuctionStore} from '@/stores/auctionStore';
import {convertCoin, price} from '@/components/func/convertCoin';
import {useProductStore} from '@/stores/productStore';
import moment from 'moment';
import {computed, onMounted, ref, watch} from 'vue';
import {useGlobalLoader} from 'vue-global-loader';
import {useRoute, RouterLink, useRouter} from 'vue-router';
import {watchOnce} from '@vueuse/core';
import {Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import {Card, CardContent} from '@/components/ui/card';

const router = useRoute();
const routeruse = useRouter();
const AuctionStore = useAuctionStore();
const productStore = useProductStore();
const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const auctionId = router.params.id as string;
const currentPrice = ref<number>(0);
const websocketStore = useWebSocketStore();
const formatDate = (date: any) => {
	return moment(date).format('HH:mm - DD/MM/YYYY');
};

const fetchdetailauctions = async () => {
	try {
		displayLoader();
		await AuctionStore.getAuctionDetail({id: auctionId});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};
const fetchdetailproducts = async () => {
	try {
		displayLoader();
		await productStore.getProductDetail({id: auctionId});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const productDetail = computed(() => productStore.ProductDetailData);
const auctionDetail = computed(() => AuctionStore.AuctionDetailData);

onMounted(async () => {
	await Promise.all([
		fetchdetailauctions(),
		fetchdetailproducts(),
		websocketStore.connect(`wss://bidding2024.group11tlu.uk/ws?userJoin=Nam&auctionId=${auctionId}`),
	]);
	currentPrice.value = auctionDetail.value.start_price;
});

const openWindow = (event: Event, auctionId: string) => {
	event.preventDefault();
	const url = routeruse.resolve({
		name: 'auction-live',
		params: {id: auctionId},
	}).href;
	window.open(url, '_blank', 'width=1370,height=880');
};
const auctionDetailsSection = ref<HTMLElement | null>(null);

const scrollToAuctionDetails = () => {
	if (auctionDetailsSection.value) {
		auctionDetailsSection.value.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}
};
const input2 = ref('');
const options = [
	{
		value: 'Option1',
		label: 'Option1',
	},
	{
		value: 'Option2',
		label: 'Option2',
	},
	{
		value: 'Option3',
		label: 'Option3',
	},
	{
		value: 'Option4',
		label: 'Option4',
	},
	{
		value: 'Option5',
		label: 'Option5',
	},
];
</script>
<template>
	<TheHeader />
	<div class="max-w-7xl mx-auto">
		<div class="mb-8 flex flex-col self-center w-full border-b">
			<div class="block w-ful flex-auto">
				<div class="flex flex-row justify-between relative h-96 w-full mb-2">
					<div class="h-96 w-1/3 p-6 flex flex-col items-center justify-center relative" style="z-index: 4">
						<a href="" class="cursor-pointer h-full justify-center flex items-center"
							><img
								:src="productDetail.productImages && productDetail.productImages[0].image_url"
								alt=""
								class="max-w-full w-full max-h-full relative h-auto block align-middle"
								style="z-index: 1"
						/></a>
						<span
							class="px-2 h-6 inline-flex justify-center items-center bg-red-600 text-white absolute top-2 left-2 leading-5 tracking-wider font-normal"
							style="z-index: 2"
							>LIVE
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
								class="w-5 h-5 min-h-5 min-w-5 mx-1"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
								/>
							</svg>
							356
						</span>

						<div class="w-full h-full pt-48 block absolute left-0" style="z-index: 6">
							<div class="col-span-2 flex flex-col h-full relative bottom-0 overflow-hidden">
								<div
									class="overflow-hidden absolute max-w-full left-0 right-0 bottom-0 mx-3"
									style="min-height: 957px; max-width: 957px"
								>
									<ul class="notification-list overflow-hidden flex flex-col-reverse absolute left-0 right-0 bottom-0">
										<transition-group name="notification-item" tag="li">
											<li
												v-for="(msg, index) in websocketStore.messages"
												:key="index"
												:class="['notification-item', {'notification-won': msg.includes('won')}]"
												class="mb-3 overflow-hidden relative block w-full opacity-100"
											>
												<div class="text-left">
													<span
														:class="['notification-item-mess', {'notification-won-mess': msg.includes('won')}]"
														class="text-xs inline-block leading-5 tracking-wider font-normal border border-gray-100 rounded-full px-5 py-2"
													>
														<span class="inline-flex items-center">{{ msg }}</span>
													</span>
												</div>
											</li>
										</transition-group>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w-full bg-gray-200 -top-0 left-0 rounded-full h-1">
					<div class="bg-red-600 h-1 rounded-full" style="width: 80%"></div>
				</div>
			</div>
			<div class="border-t-2 flex justify-between flex-row w-full">
				<div class="flex flex-col mr-4">
					<section class="mt-8 flex flex-row items-center justify-start">
						<div class="flex flex-row justify-start pr-4 border-r">
							<span class="text-sm text-gray-500 leading-3 tracking-wider"
								><div class="pr-4">
									<span v-if="auctionDetail.end_time == null" class="text-xs tracking-wide leading-4 text-gray-500">
										Started : {{ formatDate(auctionDetail.start_time) }}
									</span>
									<span v-if="auctionDetail.end_time !== null" class="text-xs tracking-wide leading-4 text-gray-500">
										Ends from : {{ formatDate(auctionDetail.end_time) }}
									</span>
								</div></span
							>
						</div>
						<div class="flex flex-row justify-start px-4 border-r">
							<span class="text-sm text-gray-500 leading-3 tracking-wider">New York, NY, United States</span>
						</div>
						<div class="flex flex-row justify-start pl-4">
							<span
								class="text-sm text-gray-900 underline cursor-pointer leading-3 tracking-wider"
								@click="scrollToAuctionDetails"
							>
								Auction Details
							</span>
						</div>
					</section>
					<div>
						<section class="flex">
							<h1 class="text-left mt-8 mb-4 block">
								<div class="text-3xl leading-10">{{ productDetail.product_name }}</div>
							</h1>
						</section>
					</div>
					<div class="mr-4 mb-8">
						<div class="flex flex-col gap-2">
							<div class="h-40 overflow-hidden relative">
								<span class="text-base leading-6">{{ productDetail.description }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="min-w-72 block max-w-96 bg-red-50">
					<div class="py-8 px-6 h-full">
						<div class="h-full max-w-full flex flex-col items-center text-center justify-start">
							<RouterLink
								to="/"
								@click="(event: any) => openWindow(event, auctionId.toString())"
								class="text-white font-semibold py-4 px-6 bg-red-700 mb-4 hover:bg-red-800 w-full rounded-lg text-sm me-2"
							>
								<span>ENTER LIVE AUCTION</span>
							</RouterLink>
							<button
								type="button"
								class="text-red-700 font-semibold py-4 px-6 bg-white mb-4 hover:bg-slate-50 w-full border border-red-700 rounded-lg text-sm me-2"
							>
								ENTER LIVE AUCTION
							</button>
							<span class="text-center block text-sm leading-5 tracking-wider"
								>You'll have to register before you can place bids in this auction. This auction has already started, so you
								might want to hurry!</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="">
			<div class="p-0 mb-8 border-b">
				<div class="flex justify-between">
					<div class="mb-8 w-80 flex items-center">
						<label for="input" class="w-auto block flex-initial font-normal pr-3">Search:</label>
						<div>
							<!-- <el-input v-model="input2" style="width: 240px" placeholder="Please Input" :suffix-icon="Search" /> -->
						</div>
					</div>
					<div class="ml-4">
						<div class="flex">
							<div class="ml-auto w-full min-w-64 flex justify-center items-center">
								<label for="" class="pr-3 block leading-4 flex-initial text-sm font-normal tracking-wider">Sort:</label>
								<div>
									<!-- <el-select v-model="value" class="pl-2" placeholder="Select" size="large" style="width: 240px">
										<template #prefix>
											<el-icon class="el-input__icon"><sort /></el-icon>
										</template>
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
									</el-select> -->
								</div>
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
			<div class="">
				<div class="grid grid-cols-4 gap-y-8 gap-x-6 justify-center w-full">
					<div class="relative self-center overflow-hidden grid" v-for="(item, index) in 10" :key="index">
						<div class="grid relative max-w-full">
							<div class="relative">
								<a href=""
									><div class="w-full relative min-w-32 max-w-full flex justify-center">
										<img
											src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/da4060189578019.65adf3d73f3f8.png"
											alt=""
											class="w-full h-full block pointer-events-none"
										/></div
								></a>
							</div>
							<a href="" class="flex items-center mt-3"
								><span class="text-base leading-6 font-normal tracking-wider"
									>0001L: Art Deco Ruby & Diamond Bracelet</span
								></a
							>
							<span class="text-sm leading-6 font-normal text-gray-500 tracking-wider"
								>Est. <span class="inline-flex items-center">US$47,021</span>-
								<span class="inline-flex items-center">US$61,127</span></span
							>
							<span class="w-full flex mt-1 text-base font-semibold leading-6 tracking-wider"
								><span class="flex items-center flex-wrap gap-x-1"
									><span class="">Sold for <span class="inline items-center">US$36,000</span> </span></span
								></span
							>
						</div>
					</div>
				</div>
			</div>
			<div ref="auctionDetailsSection" class="mt-8 mb-5 flex justify-center items-center"></div>
			<div class="mb-8 pt-4 pb-8 w-full mx-auto">
				<h2 class="border-b-2 font-semibold text-xl pb-5">Auction Details</h2>
				<div class="flex">
					<div></div>
					<div v-if="productDetail" class="overflow-hidden relative pt-8 mx-2">
						<!-- <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
										<AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
											<AccordionTrigger>{{ item.title }}</AccordionTrigger>
											<AccordionContent>
												{{ item.content }}
											</AccordionContent>
										</AccordionItem>
									</Accordion> -->

						<div class="p-0 mb-8">
							<h1 class="mb-2 text-gray-500 text-lg">Description</h1>
							<span class="whitespace-pre-wrap m-0 relative left-0"
								><div class="mb-2 ml-1">{{ productDetail.description }}</div>
								<h1 class="mb-2 text-gray-500 text-lg">Product attributes</h1>

								<div class="">
									Author:
									<span class="font-normal">{{ productDetail.author && productDetail.author.author_name }}</span>
								</div>
								<div class="">
									Category:
									<span class="font-normal">{{ productDetail.category && productDetail.category.category_name }}</span>
								</div>
								<div
									v-for="(attribute, index) in productDetail.productAttributes"
									:key="attribute.attribute_id"
									class="ml-1"
								>
									<div class="">
										{{ attribute.attribute_name }}:
										<span class="font-normal">{{ attribute.attribute_label }}</span>
									</div>
								</div></span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.notification-item {
	transition: transform 0.3s ease;
}

.notification-list {
	display: flex;
	flex-direction: column-reverse;
}

.notification-item-mess {
	color: rgb(0 0 0 / var(--tw-text-opacity));
	--tw-bg-opacity: 1;
	background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
.notification-won-mess {
	border-color: rgb(240, 70, 70);
	color: rgb(240, 70, 70);
	background-color: white;
}

.notification-won {
}
</style>
