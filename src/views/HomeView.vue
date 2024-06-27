<script setup lang="ts">
import TheHeader from '../components/theHeader.vue';
import Logo from '@/components/iconLogo.vue';
import {useWebSocketStore} from '@/stores/websocketStore';
import {useAuctionStore} from '@/stores/auctionStore';
import {convertCoin, price} from '@/components/func/convertCoin';
import {useProductStore} from '@/stores/productStore';
import {computed, onMounted, ref, watch} from 'vue';
import {useGlobalLoader} from 'vue-global-loader';
import {useRoute} from 'vue-router';
import {useUserStore} from '@/stores/userStore';
import {watchOnce} from '@vueuse/core';
import {Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import {Card, CardContent} from '@/components/ui/card';

const route = useRoute();
const AuctionStore = useAuctionStore();
const productStore = useProductStore();
const {displayLoader, destroyLoader} = useGlobalLoader();
const auctionId = route.params.id as string;
const currentPrice = ref<number>(0);
const websocketStore = useWebSocketStore();
const userStore = useUserStore();

const fetchUserInfo = async () => {
	try {
		displayLoader();
		await userStore.getUserInfo();
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const fetchdetailauctions = async () => {
	try {
		displayLoader();
		await AuctionStore.getAuctionDetail({id: '1'});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const fetchdetailproducts = async () => {
	try {
		displayLoader();
		await productStore.getProductDetail({id: '1'});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const productDetail = computed(() => productStore.ProductDetailData);
const auctionDetail = computed(() => AuctionStore.AuctionDetailData);
const userinfo = computed(() => userStore.UserData);

const canBid = computed(() => {
	return userinfo.value && websocketStore.isConnected;
});

onMounted(async () => {
	const tokens = localStorage.getItem('currentAuthTokens');

	if (tokens) {
		await fetchUserInfo();
	}
	await Promise.all([fetchdetailauctions(), fetchdetailproducts()]);
	currentPrice.value = auctionDetail.value.start_price;

	watch(
		userinfo,
		async (newValue) => {
			if (newValue && newValue.userProfile && newValue.userProfile.fullname) {
				await Promise.all([
					fetchdetailauctions(),
					fetchdetailproducts(),
					websocketStore.connect(`wss://bidding2024.group11tlu.uk/ws?userJoin=${newValue.userProfile.fullname}&auctionId=${1}`),
				]);
			}
		},
		{immediate: true}
	);
});

const incrementPrice = () => {
	if (!websocketStore.isConnected) {
		console.error('Cannot bid: WebSocket is not connected');
		return;
	}
	currentPrice.value += auctionDetail.value.price_step;
	const message = {
		name: '',
		action: 'bid',
	};
	websocketStore.sendMessage(JSON.stringify(message));
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

const translateY = ref(0);
const displayedPrices = ref<number[]>([]);

const latestCurrent = computed(() => {
	return websocketStore.currents.length > 0 ? websocketStore.currents[websocketStore.currents.length - 1] : null;
});

watch(latestCurrent, (newVal, oldVal) => {
	if (newVal !== null) {
		displayedPrices.value = [newVal, ...displayedPrices.value];

		translateY.value = -100;
		setTimeout(() => {
			translateY.value = 0;
			displayedPrices.value = [newVal];
		}, 500);
	}
});
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
							<span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									aria-hidden="true"
									viewBox="0 0 448 512"
									class="h-5 w-5 max-h-5 min-h-5 max-w-5 min-w-5 block align-middle"
								>
									<path
										d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
									></path>
								</svg>
							</span>
						</section>
					</div>
					<h1>Late Night Luxury - Louis Chanel Gucci Hermes</h1>
					<h2>Bidhaus</h2>
				</div>
				<div class="border p-6 mb-4 bg-white">
					<span class="text-base font-normal">548 of 1036 Lots Remaining</span>
					<div class="w-full mt-1 bg-gray-200 -top-0 left-0 rounded-full h-2">
						<div class="bg-gray-700 h-2 rounded-full" style="width: 10%"></div>
					</div>
				</div>
				<div class="h-full w-full relative border overflow-hidden box-border bg-white">
					<div class="h-full overflow-y-auto relative">
						<div class="w-full h-full absolute top-0">
							<div class="mt-0 box-border scroll-py-96">
								<div class="">
									<div class="min-h-32 py-4 px-6 flex flex-col border-l-4 border-l-red-500 border-b bg-white">
										<div class="flex">
											<div class="min-h-20 min-w-20 inline-flex items-center justify-center mr-4 relative">
												<div class="absolute right-1 top-1 hidden"></div>
												<img
													:src="productDetail.productImages && productDetail.productImages[0].image_url"
													alt="Image 1"
												/>
											</div>
											<div class="flex flex-col">
												<span v-if="websocketStore.isConnected" class="text-red-500">Live now</span>
												<router-link
													:to="{name: 'auction-detail', params: {id: 1}}"
													class="overflow-hidden text-sm whitespace-normal mb-1 cursor-pointer hover:underline"
													>{{ productDetail.product_name }}</router-link
												>
												<span class="flex flex-col items-start text-sm font-medium">
													<span v-if="!websocketStore.isConnected" class="text-gray-900">Sold</span>
													<span
														class="inline-flex items-center"
														v-for="(price, index) in displayedPrices"
														:key="index"
														:style="{
															transform: `translateY(${translateY}%)`,
															transition: 'transform 0.5s ease-out',
														}"
													>
														<span v-if="!websocketStore.isConnected">{{ price }} USD</span>
														<span v-if="websocketStore.isConnected">{{ price }} USD</span>
													</span>
												</span>
												<span class="flex items-center gap-2 text-sm">
													<span
														class="inline-flex items-center justify-center h-8 px-4 text-sm font-medium leading-none text-white bg-gray-900 rounded-full"
														:class="{
															'bg-gray-900 cursor-not-allowed opacity-50': !canBid,
															'bg-red-500 hover:bg-red-600': canBid,
														}"
														@click="incrementPrice"
														:disabled="!canBid"
													>
														Bid
													</span>
													<span
														class="inline-flex items-center justify-center h-8 px-4 text-sm font-medium leading-none text-gray-900 bg-gray-200 rounded-full cursor-not-allowed"
														>Sold</span
													>
												</span>
											</div>
										</div>
										<div class="flex items-center text-sm font-normal text-gray-500">
											<span>2d 9h 15m</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												aria-hidden="true"
												viewBox="0 0 24 24"
												class="h-5 w-5 ml-2"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9S3 16.96 3 12 7.04 3 12 3zm0 2C8.14 5 5 8.14 5 12s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 2.5v5.25l3.5 2.09-.5.86-4-2.37V7.5h1z"
												></path>
											</svg>
										</div>
									</div>
									<div class="mt-1 text-sm text-gray-500">{{ productDetail.description }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="border px-6 py-4 bg-white">
					<h2 class="text-sm font-normal">Currently at Auction:</h2>
					<span class="text-sm font-bold">{{ auctionDetail.current_price }} USD</span>
					<span class="text-sm text-gray-500">{{ auctionDetail.end_time }}</span>
				</div>
			</section>
			<div class="flex-1 h-full bg-gray-200">
				<div class="h-full flex flex-col items-center justify-center">
					<h1 class="text-2xl font-bold">Auction Detail Page</h1>
					<div class="w-2/3 p-6 mt-4 bg-white shadow-lg">
						<h2 class="text-xl font-semibold">{{ productDetail.product_name }}</h2>
						<p>{{ productDetail.description }}</p>
						<div class="mt-4">
							<h3 class="text-lg font-medium">Current Bid: {{ currentPrice }} USD</h3>
							<button
								:class="{'bg-gray-300 cursor-not-allowed': !canBid, 'bg-red-500 text-white': canBid}"
								:disabled="!canBid"
								@click="incrementPrice"
							>
								Bid
							</button>
						</div>
						<div v-if="!canBid" class="mt-2 text-red-500">
							You cannot place a bid right now. Please make sure you are connected and have provided your user information.
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
