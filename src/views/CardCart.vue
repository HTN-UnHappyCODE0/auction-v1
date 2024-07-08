<script setup lang="ts">
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import moment from 'moment';
import {computed, ref} from 'vue';
import {Toaster} from '@/components/ui/toast';
import {useToast} from '@/components/ui/toast/use-toast';
import {useGlobalLoader} from 'vue-global-loader';
import {useOrderStore} from '@/stores/oderStore';
import {onMounted} from 'vue';
import {convertCoin} from '@/components/func/convertCoin';

const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();

const OrderStore = useOrderStore();
console.log('order', OrderStore);

const fetchOrderData = async () => {
	try {
		await OrderStore.getAllOrder();
	} catch (error) {
		console.error(error);
	} finally {
	}
};
const totalPrice = computed(() => {
	return orderData.value.reduce((total, item) => {
		const price = item?.order_detail?.product?.price ?? 0;
		return total + price;
	}, 0);
});

const handleDeleteOrder = async (orderId: number) => {
	try {
		displayLoader();
		await OrderStore.deleteOrder(orderId);
	} catch (error) {
		console.error('Error deleting order:', error);
	} finally {
		fetchOrderData();
		destroyLoader();
	}
};
const tax = computed(() => {
	return totalPrice.value * 0.25;
});
const orderData = computed(() => OrderStore.OrderData);
onMounted(async () => {
	await Promise.all([fetchOrderData()]);
});
</script>
<template>
	<Toaster />
	<CardHeader>
		<CardTitle>cart</CardTitle>
		<CardDescription> Make changes to your profile here. Click save when you're done. </CardDescription>
	</CardHeader>
	<div class="flex justify-center px-3">
		<div class="w-full h-full bg-black top-0">
			<div class="flex bg-white lg:flex-row flex-col">
				<div class="w-full lg:px-8 lg:py-4 md:px-6 px-4 md:py-4 py-4 bg-white">
					<p
						class="lg:text-4xl text-3xl bg-white w-full lg:w-3/5 lg:mx-auto lg:px-8 lg:py-4 md:px-6 px-4 md:py-4 py-4 font-black leading-10 text-gray-800"
					>
						Cart
					</p>
					<div class="overflow-y-auto h-96">
						<div v-for="(item, index) in orderData" class="w-full">
							<div class="flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-600">
								<div class="w-2/5">
									<img
										:src="item?.order_detail?.product?.productImages[0]?.image_url"
										alt="Black Leather Bag"
										class="h-full lg:object-center lg:object-cover w-full object-center object-cover"
									/>
								</div>
								<div class="w-full ml-3 flex flex-col justify-center">
									<p class="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{{ item?.order_detail?.product_id }}</p>
									<div class="flex items-center justify-between w-full pt-1">
										<p class="text-base font-black leading-none text-gray-800">
											{{ item?.order_detail?.product?.product_name }}
										</p>
										<button
											@click="handleDeleteOrder(item?.order_id)"
											class="text-gray-500 hover:text-gray-900 cursor-pointer"
										>
											<svg
												class="w-4 h-4"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
											>
												<path
													d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
												/>
											</svg>
										</button>
									</div>
									<p class="text-xs leading-3 text-gray-600 pt-2">
										{{ item?.order_detail?.product?.author?.author_name }}
									</p>
									<p class="text-xs leading-3 text-gray-600 py-4">
										Order date: {{ moment(item?.order_date).format('DD/MM/YYYY') }}
									</p>

									<div class="flex items-center justify-between pt-5">
										<div class="flex itemms-center">
											<p class="text-xl leading-3 text-gray-800 cursor-pointer">Price</p>
										</div>
										<p class="text-base font-black leading-none text-gray-800">
											{{ convertCoin(item?.order_detail?.product?.price) }}
											<span class="text-base font-medium">VND</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="lg:w-96 w-full bg-gray-100 h-full">
					<div class="flex flex-col lg:h-96 h-auto lg:px-8 md:px-7 px-4 lg:py-4 md:py-4 py-6 justify-between">
						<div>
							<div class="text-2xl flex justify-center font-black leading-9 text-gray-800">
								<p>Total price</p>
							</div>
							<div class="flex items-center justify-between pt-16">
								<p class="text-base leading-none text-gray-800">Subtotal</p>
								<p class="text-base leading-none text-gray-800">{{ convertCoin(totalPrice) }} VND</p>
							</div>
							<!-- <div class="flex items-center justify-between pt-5">
								<p class="text-base leading-none text-gray-800">Shipping</p>
								<p class="text-base leading-none text-gray-800">$30</p>
							</div> -->
							<div class="flex items-center justify-between pt-5">
								<p class="text-base leading-none text-gray-800">Tax</p>
								<p class="text-base leading-none text-gray-800">{{ convertCoin(tax) }} VND</p>
							</div>
						</div>
						<div>
							<div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
								<p class="text-2xl leading-normal text-gray-800 pr-2">Total</p>
								<p class="text-2xl font-bold leading-normal text-right text-gray-800">
									{{ convertCoin(totalPrice + tax) }}
								</p>
							</div>
							<button class="text-base w-full py-5 bg-gray-800 border-gray-800 border text-white">Checkout</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
