<script setup lang="ts">
import {useAuctionStore} from '@/stores/auctionStore';
import TheHeader from '../components/theHeader.vue';
import {RouterLink, useRouter} from 'vue-router';
import {useGlobalLoader} from 'vue-global-loader';
import {computed, onMounted} from 'vue';
import moment from 'moment';

const AuctionStore = useAuctionStore();
const {displayLoader, destroyLoader} = useGlobalLoader();
const router = useRouter();

const formatDate = (date: any) => {
	return moment(date).format('HH:mm - DD/MM/YYYY');
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

const auctions = computed(() => AuctionStore.AuctionData);
onMounted(async () => {
	await fetchAuctions();
});

const openWindow = (event: Event, auctionId: string) => {
	event.preventDefault();

	const url = router.resolve({
		name: 'auction-live',
		params: {id: auctionId},
	}).href;

	window.open(url, '_blank', 'width=1170,height=880');
};
</script>

<template>
	<TheHeader />
	<div class="w-full m-5">
		<div class="max-w-7xl mx-auto relative">
			<div>
				<div class="-ml-5 min-h-80 flex flex-wrap content-stretch justify-start">
					<div v-for="item in auctions" :key="item.auction_id" class="lg:w-1/3 sm:w-1/2 pt-0 pb-4 px-3">
						<div class="block relative">
							<RouterLink to="/">
								<div class="block w-full relative border pb-2/3">
									<div class="absolute inset-0">
										<div class="float-left text-center w-2/3 h-full border border-r block relative overflow-hidden">
											<img
												src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/da4060189578019.65adf3d73f3f8.png"
												alt=""
												class="max-w-full w-full h-full max-h-full absolute m-auto inset-0 block align-middle"
											/>
										</div>
										<div class="w-1/3 h-full inline-block">
											<div class="overflow-hidden w-full h-1/2 block relative cursor-pointer">
												<img
													src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/da4060189578019.65adf3d73f3f8.png"
													alt=""
													class="inset-0 block m-auto max-h-full max-w-full h-auto absolute align-middle"
												/>
											</div>
											<div class="overflow-hidden w-full h-1/2 block relative cursor-pointer">
												<img
													src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/a8e28788987849.5deca708976da.jpg"
													alt=""
													class="inset-0 block m-auto max-h-full max-w-full h-auto absolute align-middle"
												/>
											</div>
										</div>
									</div>
								</div>
							</RouterLink>

							<span
								class="px-2 h-6 inline-flex justify-center items-center bg-red-600 text-white absolute top-2 left-2 leading-5 tracking-wider font-normal"
							>
								LIVE
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
							<div class="relative p-3 border border-t-0 flex flex-col">
								<div class="w-full bg-gray-200 -top-0 left-0 rounded-full h-1 absolute">
									<div class="bg-red-600 h-1 rounded-full" style="width: 80%"></div>
								</div>
								<h4
									class="text-base text-ellipsis overflow-hidden whitespace-nowrap text-left max-w-full h-6 font-normal tracking-wider"
								>
									<a href="">Interior Design - Fashionable Home Wholesale Collectible Louis Chanel Hermes +++</a>
								</h4>
								<span class="flex h-6 justify-start items-center">
									<div class="pr-4">
										<span v-if="item.end_time == null" class="text-xs tracking-wide leading-4 text-gray-500">
											Started : {{ formatDate(item.start_time) }}
										</span>
										<span v-if="item.end_time !== null" class="text-xs tracking-wide leading-4 text-gray-500">
											Ends from : {{ formatDate(item.end_time) }}
										</span>
									</div>
								</span>
								<div class="h-6 flex justify-end items-center">
									<!-- Sử dụng sự kiện click để mở cửa sổ mới với kích thước cụ thể -->
									<a
										href="#"
										@click="(event) => openWindow(event, item.auction_id.toString())"
										class="cursor-pointer items-center inline-flex text-red-500 hover:underline"
									>
										Bid now
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 256 512"
											class="w-5 h-5 min-h-5 min-w-5"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
