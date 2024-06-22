<script setup lang="ts">
import TheHeader from '../components/theHeader.vue';
import Logo from '@/components/iconLogo.vue';
import {useWebSocketStore} from '@/stores/websocketStore';
import {useAuctionStore} from '@/stores/auctionStore';
import {convertCoin} from '@/components/func/convertCoin';
import {useProductStore} from '@/stores/productStore';
import {computed, onMounted, ref} from 'vue';
import {useGlobalLoader} from 'vue-global-loader';
import {useRoute} from 'vue-router';
import {watchOnce} from '@vueuse/core';
import {Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import {Card, CardContent} from '@/components/ui/card';

const route = useRoute();
const AuctionStore = useAuctionStore();
const productStore = useProductStore();
const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const auctionId = route.params.id as string;
const currentPrice = ref<number>(0);
const websocketStore = useWebSocketStore();

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
	await Promise.all([fetchdetailauctions(), fetchdetailproducts()]);
	currentPrice.value = auctionDetail.value.start_price;
	websocketStore.connect('wss://echo.websocket.events');
});

const incrementPrice = () => {
	currentPrice.value += auctionDetail.value.price_step;
	const convertedPrice = convertCoin(currentPrice.value);
	websocketStore.sendMessage(convertedPrice);
};

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
	if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
	selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
	emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
	if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
	emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
	if (!emblaMainApi) return;

	onSelect();
	emblaMainApi.on('select', onSelect);
	emblaMainApi.on('reInit', onSelect);
});

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

const defaultValue = 'item-1';

const accordionItems = [
	{value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.'},
	{value: 'item-2', title: 'Is it unstyled?', content: "Yes. It's unstyled by default, giving you freedom over the look and feel."},
	{value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.'},
];
</script>
<template>
	<TheHeader />
	<div class="max-w-7xl mt-1 mx-auto h-screen">
		<div class="h-full flex flex-row">
			<section class="w-96 py-4 px-6 flex flex-col bg-gray-200">
				<div class="p-6 mb-4 border bg-white">
					<div class="flex items-center justify-between">
						<Logo />
						<section>
							<span
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									aria-hidden="true"
									viewBox="0 0 448 512"
									class="h-5 w-5 max-h-5 min-h-5 max-w-5 min-w-5 block align-middle"
								>
									<path
										d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
									/>
								</svg>
							</span>
						</section>
					</div>
					<h1>Late Night Luxury - Louis Chanel Gucci Hermes</h1>

					<h2>Bidhaus</h2>
				</div>
				<div class="border p-6 bg-white">
					<span class="text-base font-normal">548 of 1036 Lots Remaining</span>
					<div class="w-full mt-1 bg-gray-200 -top-0 left-0 rounded-full h-2">
						<div class="bg-gray-700 h-2 rounded-full" style="width: 80%"></div>
					</div>
				</div>
				<div></div>
			</section>
			<section class="h-full w-full pl-5">
				<div class="grid grid-rows-10 h-full">
					<div class="row-span-1 p-4">
						<h1 class="text-2xl leading-9 font-normal">{{ productDetail.product_id }}: {{ productDetail.product_name }}</h1>
					</div>
					<div class="row-start-2 row-span-6">
						<div class="grid h-full grid-cols-6">
							<div class="col-span-4 h-full mr-5 overflow-auto">
								<div class="w-full flex justify-center">
									<div class="w-auto">
										<Carousel class="relative w-full max-w-md" @init-api="(val) => (emblaMainApi = val)">
											<CarouselContent>
												<CarouselItem v-for="(_, index) in 10" :key="index">
													<div class="p-1">
														<Card>
															<CardContent class="flex aspect-square items-center justify-center p-6">
																<span class="text-4xl font-semibold">{{ index + 1 }}</span>
															</CardContent>
														</Card>
													</div>
												</CarouselItem>
											</CarouselContent>
											<CarouselPrevious />
											<CarouselNext />
										</Carousel>

										<Carousel class="relative w-full max-w-md" @init-api="(val) => (emblaThumbnailApi = val)">
											<CarouselContent class="flex gap-1 ml-0">
												<CarouselItem
													v-for="(_, index) in 10"
													:key="index"
													class="pl-0 basis-1/4 cursor-pointer"
													@click="onThumbClick(index)"
												>
													<div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
														<Card>
															<CardContent class="flex aspect-square items-center justify-center p-6">
																<span class="text-4xl font-semibold">{{ index + 1 }}</span>
															</CardContent>
														</Card>
													</div>
												</CarouselItem>
											</CarouselContent>
										</Carousel>
									</div>
								</div>

								<div class="">
									<Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
										<AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
											<AccordionTrigger>{{ item.title }}</AccordionTrigger>
											<AccordionContent>
												{{ item.content }}
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
							</div>
							<div class="col-span-2 flex flex-col relative border overflow-hidden">
								<div
									class="overflow-hidden absolute max-w-full left-0 right-0 bottom-0 mx-3"
									style="min-height: 957px; max-width: 957px"
								>
									<ul class="overflow-hidden flex flex-col absolute left-0 right-0 bottom-0">
										<li
											v-for="(msg, index) in websocketStore.messages"
											:key="index"
											class="mb-3 overflow-hidden relative block w-full opacity-100"
										>
											<div class="text-left">
												<span
													class="text-sm text-black inline-block leading-5 tracking-wider font-normal border border-gray-700 rounded-full px-5 py-2"
													><span class="inline-flex items-center">{{ msg }}</span
													>: Competing Bid</span
												>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="row-start-8 row-span-10 p-8 mb-4 mt-3 bg-gray-200">
						<div class="flex flex-row justify-between items-center mb-2">
							<div></div>
							<div class="flex flex-col">
								<span class="inline text-base leading-6 tracking-wider font-normal"
									>Starting price: <span class="inline-flex items-center">{{ auctionDetail.start_price }} VND</span></span
								>
								<span class="inline text-base leading-6 tracking-wider font-normal"
									>Step price: <span class="inline-flex items-center">{{ auctionDetail.price_step }} VND</span></span
								>
							</div>
						</div>
						<div class="mb-4 border flex rounded-lg overflow-hidden px-4 py-3 bg-white justify-end">
							<div class="h-14 relative overflow-hidden font-medium text-5xl items-center">
								<span> {{ convertCoin(currentPrice) }} VND</span>
							</div>
						</div>
						<button
							@click="incrementPrice"
							class="w-full text-base font-semibold h-10 tracking-widest border rounded-lg cursor-pointer inline-flex flex-col justify-center items-center px-6 text-center align-middle whitespace-nowrap bg-cyan-800 text-white"
						>
							<div>Bid</div>
						</button>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
