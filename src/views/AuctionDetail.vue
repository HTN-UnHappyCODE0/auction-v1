<template>
	<div class="max-w-7xl mx-auto">
		<div class="mb-8 flex flex-col self-center w-full border-b">
			<div class="block w-ful flex-auto">
				<div class="flex flex-row justify-between relative h-96 w-full mb-2">
					<div class="h-96 w-1/3 p-6 flex flex-col items-center justify-center relative" style="z-index: 4">
						<a href="" class="cursor-pointer h-full justify-center flex items-center"
							><img
								src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/da4060189578019.65adf3d73f3f8.png"
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
						<div class="block absolute bottom-1 left-0" style="width: 500px; z-index: 2">
							<div
								class="max-w-full min-h-40 bg-transparent max-h-40 overflow-hidden absolute left-0 right-0 bottom-0 z-10 ml-0"
							>
								<ul class="overflow-hidden flex flex-col absolute">
									<li v-for="index in 4" :key="index" class="h-12 opacity-100 relative overflow-hidden block w-full">
										<div>
											<div class="text-left">
												<span
													class="text-base leading-6 tracking-wider inline-block border bg-gray-100 rounded-full border-gray-100 mx-1 py-1 px-2"
													><span class="inline-flex items-center pl-1">US$190</span>
													<div class="inline-flex pr-1"></div>
													: Competing Bid</span
												>
											</div>
										</div>
									</li>
								</ul>
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
							<span class="text-sm text-gray-500 leading-3 tracking-wider">Started: May 06, 2024 5:00 PM GMT+7</span>
						</div>
						<div class="flex flex-row justify-start px-4 border-r">
							<span class="text-sm text-gray-500 leading-3 tracking-wider">New York, NY, United States</span>
						</div>
						<div class="flex flex-row justify-start pl-4">
							<span class="text-sm text-gray-900 underline cursor-pointer leading-3 tracking-wider">Auction Details</span>
						</div>
					</section>
					<div>
						<section class="flex">
							<h1 class="text-left mt-8 mb-4 block">
								<div class="text-3xl leading-10">Wholesale Collectible Louis Chanel Hermes +++</div>
							</h1>
						</section>
					</div>
					<div class="mr-4 mb-8">
						<div class="flex flex-col gap-2">
							<div class="h-40 overflow-hidden relative">
								<span class="text-base leading-6"
									>Now with FREE SHIPPING to customers in the USA! Take advantage of our low prices for authentic high-end
									jewelry and designer bags/accessory items. Whether you are a reseller, collector, or simply looking for
									the perfect gift, our selection and pricing means you are likely to find the perfect solution for all
									your shopping needs.</span
								>
							</div>
						</div>
					</div>
				</div>
				<div class="min-w-72 block max-w-full bg-red-50">
					<div class="py-8 px-6 h-full">
						<div class="h-full max-w-full flex flex-col items-center text-center justify-start">
							<router-link
								:to="{name: 'auction-live', params: {id: 1}}"
								type="button"
								class="text-white font-semibold py-4 px-6 bg-red-700 mb-4 hover:bg-red-800 w-full rounded-lg text-sm me-2"
							>
								<span>ENTER LIVE AUCTION</span>
							</router-link>
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
							<el-input v-model="input2" style="width: 240px" placeholder="Please Input" :suffix-icon="Search" />
						</div>
					</div>
					<div class="ml-4">
						<div class="flex">
							<div class="ml-auto w-full min-w-64 flex justify-center items-center">
								<label for="" class="pr-3 block leading-4 flex-initial text-sm font-normal tracking-wider">Sort:</label>
								<div>
									<el-select v-model="value" class="pl-2" placeholder="Select" size="large" style="width: 240px">
										<template #prefix>
											<el-icon class="el-input__icon"><sort /></el-icon>
										</template>
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
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
			<div class="mt-8 mb-5 flex justify-center items-center">
				<el-pagination
					v-model:current-page="currentPage4"
					v-model:page-size="pageSize4"
					:page-sizes="[100, 200, 300, 400]"
					:small="false"
					:background="false"
					layout="total, sizes, prev, pager, next, jumper"
					:total="99900"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</div>
	</div>
</template>
<script setup>
import {ref} from 'vue';
// import {Search, Sort} from '@element-plus/icons-vue';
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
