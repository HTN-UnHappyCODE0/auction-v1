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
const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const auctionId = route.params.id as string;
const currentPrice = ref<number>(0);
const websocketStore = useWebSocketStore();
const userStore = useUserStore();

const isAuthenticated = ref(); // Reactive reference for authentication state

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
		await AuctionStore.getAuctionDetail({id: auctionId});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const fetchdetailproducts = async (id: string) => {
	try {
		displayLoader();
		await productStore.getProductDetail({id});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const fetchwstoken = async () => {
	try {
		displayLoader();
		await websocketStore.generateToken();
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const productDetail = computed(() => productStore.ProductDetailData);
const auctionDetail = computed(() => AuctionStore.AuctionDetailData);
const userinfo = computed(() => userStore.UserData);
const productId = computed(() => auctionDetail.value?.product_id);

onMounted(async () => {
	const tokens = localStorage.getItem('currentAuthTokens');

	if (tokens) {
		isAuthenticated.value = true;
		fetchUserInfo();
	}
	await fetchdetailauctions();
	watch(
		productId,
		async (newProductId) => {
			if (newProductId) {
				await fetchdetailproducts(newProductId.toString());
			}
		},
		{immediate: true}
	);

	currentPrice.value = auctionDetail.value.start_price;

	watch(
		userinfo,
		async (newValue) => {
			if (newValue && newValue.userProfile && newValue.userProfile.fullname) {
				currentPrice.value = auctionDetail.value.start_price;

				await fetchwstoken();

				await websocketStore.connect(
					`http://localhost:5081/ws?userId=${newValue.userProfile.user_id}&auctionId=${auctionId}&socketToken=${websocketStore.WsToken?.socketToken}`
				);
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
	<!-- <TheHeader /> -->
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
				<div class="border p-6 mb-4 bg-white">
					<!-- <span class="text-base font-normal">548 of 1036 Lots Remaining</span> -->
					<div class="w-full mt-1 bg-gray-200 -top-0 left-0 rounded-full h-2">
						<div class="bg-gray-700 h-2 rounded-full" style="width: 10%"></div>
					</div>
				</div>
				<!-- <div class="border p-6 bg-white"></div> -->
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
													:to="{name: 'auction-detail', params: {id: auctionId}}"
													class="overflow-hidden text-sm whitespace-normal mb-1 cursor-pointer hover:underline"
													>{{ productDetail.product_name }}</router-link
												>
												<span class="flex flex-col items-start text-sm font-medium"
													><span v-if="!websocketStore.isConnected" class="text-gray-900">Sold</span
													><span class="inline-flex items-center" v-for="(price, index) in displayedPrices"
														>{{ convertCoin(price) }} VND</span
													>
													<!-- <span class="">(10 bids)</span> -->
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
												<CarouselItem v-for="(image, index) in productDetail.productImages" :key="index">
													<div class="p-1">
														<Card>
															<CardContent class="flex aspect-square items-center justify-center p-6">
																<span class="text-4xl font-semibold">
																	<img
																		:src="image.image_url"
																		:alt="'Image ' + (index + 1)"
																		class="object-cover w-full h-full"
																	/>
																</span>
															</CardContent>
														</Card>
													</div>
												</CarouselItem>
											</CarouselContent>
											<CarouselPrevious />
											<CarouselNext />
										</Carousel>

										<Carousel class="relative w-full max-w-md" @init-api="(val: any) => (emblaThumbnailApi = val)">
											<CarouselContent class="flex gap-1 ml-0">
												<CarouselItem
													v-for="(image, index) in productDetail.productImages"
													:key="index"
													class="pl-0 basis-1/4 cursor-pointer"
													@click="onThumbClick(index)"
												>
													<div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
														<Card>
															<CardContent class="flex aspect-square items-center justify-center p-2">
																<span class=""
																	><img
																		:src="image.image_url"
																		:alt="'Image ' + (index + 1)"
																		class="object-cover w-full h-full"
																/></span>
															</CardContent>
														</Card>
													</div>
												</CarouselItem>
											</CarouselContent>
										</Carousel>
									</div>
								</div>

								<div v-if="productDetail" class="overflow-hidden relative mt-8 pt-8 border-t mx-2">
									<h5 class="mb-4 font-semibold text-lg">Item Details</h5>
									<div class="p-0 mb-8">
										<h1 class="mb-2 text-gray-500 text-lg">Description</h1>
										<span class="whitespace-pre-wrap m-0 relative left-0"
											><div class="mb-2 ml-1">{{ productDetail.description }}</div>
											<h1 class="mb-2 text-gray-500 text-lg">Product attributes</h1>

											<div class="">
												Author:
												<span class="font-normal">{{
													productDetail.author && productDetail.author.author_name
												}}</span>
											</div>
											<div class="">
												Category:
												<span class="font-normal">{{
													productDetail.category && productDetail.category.category_name
												}}</span>
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
							<div class="col-span-2 flex flex-col relative border overflow-hidden">
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
														class="text-sm inline-block leading-5 tracking-wider font-normal border border-gray-100 rounded-full px-5 py-2"
													>
														<span class="inline-flex items-center">{{ msg }}</span
														>: Competing Bid
													</span>
												</div>
											</li>
										</transition-group>
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
						<div class="relative h-16 bg-white rounded-lg">
							<div
								v-if="latestCurrent !== null"
								class="absolute w-full h-full flex items-center justify-end overflow-hidden pr-4"
							>
								<div
									v-for="(price, index) in displayedPrices"
									:key="index"
									:style="{transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease'}"
									class="absolute w-full flex justify-end text-5xl font-medium"
								>
									{{ convertCoin(price) }} VND
								</div>
							</div>
						</div>
						<button
							@click="incrementPrice"
							:disabled="!websocketStore.isConnected"
							:class="{
								'bg-cyan-800 text-white active:scale-95 ': websocketStore.isConnected,
								'bg-gray-500 text-gray-200': !websocketStore.isConnected,
							}"
							class="w-full text-base font-semibold h-10 tracking-widest border rounded-lg cursor-pointer inline-flex flex-col justify-center items-center px-6 text-center align-middle whitespace-nowrap mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<div>Bid</div>
						</button>
					</div>
				</div>
			</section>
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
