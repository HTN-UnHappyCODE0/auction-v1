<template>
	<div ref="scrollTopButton" class="fixed w-full flex justify-end bottom-2 pb-3 pr-5 transition">
		<div class="text-gray-400 transition">
			<button
				@click="scrollToTop"
				type="button"
				class="text-white bg-gray-700 hover:bg-gray-950 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
			>
				<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
					/>
				</svg>
				<span class="sr-only">Icon description</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, ref} from 'vue';

export default defineComponent({
	setup() {
		const scrollTopButton = ref<HTMLDivElement | null>(null);

		const handleScroll = () => {
			if (scrollTopButton.value) {
				if (window.scrollY > 0) {
					scrollTopButton.value.classList.remove('invisible');
				} else {
					scrollTopButton.value.classList.add('invisible');
				}
			}
		};

		const scrollToTop = () => {
			window.scrollTo({top: 0, behavior: 'smooth'});
		};

		onMounted(() => {
			window.addEventListener('scroll', handleScroll);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('scroll', handleScroll);
		});

		return {
			scrollTopButton,
			scrollToTop,
		};
	},
});
</script>
