<script setup lang="ts">
import listProducts from '../../public/data1.json';
import TheHeader from '../components/theHeader.vue';
import {Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import {Card, CardContent} from '@/components/ui/card';
import {useRoute} from 'vue-router';
import {useProductStore} from '@/stores/productStore';
import {convertCoin} from '@/components/func/convertCoin';
import {useGlobalLoader} from 'vue-global-loader';
import {computed, onMounted, ref} from 'vue';
import {watchOnce} from '@vueuse/core';
const url = 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/da4060189578019.65adf3d73f3f8.png';

const route = useRoute();
const productStore = useProductStore();
const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const productId = route.params.id as string;
const sizeAttribute = computed(() => {
	return productDetail.value.productAttributes?.find((attribute) => attribute.attribute_name === 'Size')?.attribute_label || 'N/A';
});
const materialAttribute = computed(() => {
	return productDetail.value.productAttributes?.find((attribute) => attribute.attribute_name === 'Material')?.attribute_label || 'N/A';
});
const subjectlAttribute = computed(() => {
	return productDetail.value.productAttributes?.find((attribute) => attribute.attribute_name === 'Subject')?.attribute_label || 'N/A';
});
const styleAttribute = computed(() => {
	return productDetail.value.productAttributes?.find((attribute) => attribute.attribute_name === 'Style')?.attribute_label || 'N/A';
});

const fetchdetailproducts = async () => {
	try {
		displayLoader();
		await productStore.getProductDetail({id: productId});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const productDetail = computed(() => productStore.ProductDetailData);

onMounted(async () => {
	await Promise.all([fetchdetailproducts()]);
});

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
</script>
<template>
	<TheHeader />
	<div class="w-full mx-auto max-w-screen-2xl flex-1">
		<div class="px-10 pt-10">
			<div class="grid grid-cols-12 gap-5 mb-11 text-base leading-6">
				<div class="col-span-8 w-full block">
					<div class="w-full flex justify-center">
						<div class="w-auto">
							<Carousel class="relative w-full max-w-lg" @init-api="(val) => (emblaMainApi = val)">
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

							<Carousel class="relative w-full max-w-lg" @init-api="(val: any) => (emblaThumbnailApi = val)">
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

					<div class="mt-8"></div>
					<div>
						<div class="relative mb-5">
							<div class="w-full overflow-x-auto">
								<div class="whitespace-nowrap min-w-full h-full inline-flex align-top border-0 border-b border-gray-200">
									<div class="text-center">
										<button class="cursor-pointer">
											<div class="h-10 px-5"><span class="">About the artwork</span></div>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="border p-5 text-sm leading-5">
							<dl class="flex flex-row m-0">
								<dt class="mr-5 w-36 flex-shrink-0">Material</dt>
								<dd class="text-gray-500">
									<span>{{ materialAttribute }}</span>
								</dd>
							</dl>
							<div class="mt-3"></div>
							<dl class="flex flex-row m-0">
								<dt class="mr-5 w-36 flex-shrink-0">Size</dt>
								<dd class="text-gray-500">
									<span>{{ sizeAttribute }}</span>
								</dd>
							</dl>
							<!-- <div class="mt-3"></div>
							<dl class="flex flex-row m-0">
								<dt class="mr-5 w-36 flex-shrink-0">Rarity</dt>
								<dd class="text-gray-500">
									<span>Limited edition</span>
								</dd>
							</dl> -->
							<div class="mt-3"></div>
							<dl class="flex flex-row m-0">
								<dt class="mr-5 w-36 flex-shrink-0">Subject</dt>
								<dd class="text-gray-500">
									<span>{{ subjectlAttribute }} </span>
								</dd>
							</dl>
							<div class="mt-3"></div>
							<dl class="flex flex-row m-0">
								<dt class="mr-5 w-36 flex-shrink-0">Category</dt>
								<dd class="text-gray-500">
									<span>{{ productDetail.category?.category_name }} </span>
								</dd>
							</dl>
							<div class="mt-3"></div>
							<dl class="flex flex-row m-0">
								<dt class="mr-5 w-36 flex-shrink-0">Style</dt>
								<dd class="text-gray-500">
									<span>{{ styleAttribute }}</span>
								</dd>
							</dl>
							<div class="mt-3"></div>
						</div>
						<div class="border p-5 mt-5">
							<div class="flex items-center mb-5">
								<a class="flex" href=""
									><div class="w-12 h-12 rounded-full mr-3 flex">
										<div class="absolute">
											<div class="bg-inherit">
												<img
													src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/da4060189578019.65adf3d73f3f8.png"
													alt=""
													class="w-12 h-12 block object-cover rounded-full pointer-events-none"
												/>
											</div>
										</div>
									</div>
									<div class="flex flex-col mr-3 flex-1 overflow-hidden">
										<div>{{ productDetail.product_name }}</div>
										<div class="text-gray-500 text-sm">French, b. 1983</div>
									</div></a
								>
							</div>
							<div class="leading-6">
								<p>
									Jean Jullien is a French graphic artist known for his playful and incisive illustrations that capture
									the quirks of everyday life. His style is characterized by bold, expressive lines and a humorous
									approach to depicting everyday scenes and interactions. Jullien’s work spans a range of mediums,
									including illustration, photography, video, costumes, installations, books, posters, and clothing.
									Jullien studied at Central Saint Martins and the Royal College of Art in London, and his work has been
									exhibited in cities such as Paris, London, Brussels, New York, San Francisco, and Tokyo. He has also
									worked with clients including
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-4 w-full block mt-5">
					<div class="flex flex-col">
						<a Jean href="" class="text-3xl leading-8 tracking-normal hover:underline">{{ productDetail.product_name }}</a>
						<h1 class="text-3xl leading-8 tracking-normal text-gray-400 italic">{{ productDetail.author?.author_name }}</h1>
						<div class="my-5">
							<div class="text-gray-500">{{ productDetail.description }}</div>
							<div class="text-gray-500">{{ sizeAttribute }}</div>
							<!-- <div class="text-gray-500">Edition of 50</div> -->
						</div>
						<div class="text-3xl leading-8 tracking-normal mb-8">{{ convertCoin(productDetail.price) }} VND</div>
						<button
							type="button"
							class="text-white bg-gray-950 hover:underline hover:bg-blue-600 text-base rounded-full px-5 py-2.5 me-2 mb-2"
						>
							Bidding
						</button>
						<div class="mt-1"></div>
						<button
							type="button"
							class="text-gray-950 bg-white hover:underline hover:bg-blue-600 hover:border-blue-600 hover:text-white text-base border border-gray-950 rounded-full px-5 py-2.5 me-2 mb-2"
						>
							make an Offer
						</button>
					</div>
				</div>
			</div>
			<div class="text-base leading-6 antialiased">
				<div class="flex flex-row justify-between">
					<div class="text-2xl leading-8 tracking-normal">Other works by Jean Jullien</div>
					<router-link :to="{}" class="ml-5 flex-shrink-0 cursor-pointer"
						><div class="leading-5 underline">View all</div></router-link
					>
				</div>
				<div class="mt-5">
					<ul class="my-8 mx-8 columns-3 lg:columns-3xs">
						<li v-for="item of listProducts" :key="item.product_id" class="h-full">
							<router-link :to="{}">
								<div class="group min-w-10 mb-5 relative">
									<div class="w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 lg:h-full">
										<img
											:src="item.image_url"
											:alt="item.price"
											class="h-full w-full object-cover object-center lg:h-full lg:w-full"
										/>
										<div class="mt-2">
											<h3 class="">
												{{ item.product_name }}
											</h3>
											<h4 class="text-gray-500 italic">
												{{ item.description }}
											</h4>
											<h5 class="font-medium">
												{{ item.price }}
											</h5>
										</div>
									</div>
								</div>
							</router-link>
						</li>
					</ul>
					<!-- <div class="flex-1 min-w-0 mr-5 block">
                <div class="block">
                  <div class="w-full relative" style="padding-bottom: 100%">
                    <a href="" class="block h-full w-full absolute cursor-pointer"
                      ><div class="relative overflow-hidden w-full h-full">
                        <img
                          class="w-full h-full"
                          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/da4060189578019.65adf3d73f3f8.png"
                          alt=""
                        /></div
                    ></a>
                  </div>
                  <div class="mt-3 text-left cursor-pointer">
                    <div>Jean Jullien</div>
                    <div class="text-gray-400 italic">Puffer Fish Bamboo Plate, 2023</div>
                    <div class="font-medium">UC$900</div>
                  </div>
                </div>
              </div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
