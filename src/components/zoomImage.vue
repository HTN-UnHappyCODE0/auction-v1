<template>
	<div class="flex justify-center items-center m-auto">
		<div @mousemove="handleMouseMove" @mouseleave="resetTransform" class="overflow-hidden w-full h-full relative" ref="container">
			<img :src="src" :style="imgStyle" alt="Zoomable Image" class="w-full origin-center object-cover" ref="imageRef" />
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, onUnmounted} from 'vue';
import {ImageGridCalculator} from './func/imageGrid';

export default defineComponent({
	name: 'ZoomableImage',
	props: {
		src: {
			type: String,
			required: true,
		},
		figureId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const container = ref<HTMLElement | null>(null);
		const imageRef = ref<HTMLImageElement | null>(null);
		const imgStyle = reactive({
			transformOrigin: '' as string,
			transform: '' as string,
		});

		const handleMouseMove = (event: MouseEvent) => {
			if (container.value) {
				const rect = container.value.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;

				imgStyle.transformOrigin = `${x}px ${y}px`;
				imgStyle.transform = 'scale(2)';
			}
		};

		const resetTransform = () => {
			imgStyle.transformOrigin = 'center';
			imgStyle.transform = 'scale(1)';
		};

		onMounted(() => {
			if (container.value) {
				container.value.addEventListener('mousemove', handleMouseMove);
				container.value.addEventListener('mouseleave', resetTransform);
			}

			if (imageRef.value) {
				imageRef.value.addEventListener('load', () => {
					const imageGrid = ImageGridCalculator(imageRef.value as HTMLImageElement);
					const figureElement = document.getElementById(props.figureId);
					if (figureElement) {
						figureElement.style.setProperty('grid-row-end', 'span ' + imageGrid);
					}
				});
			}
		});

		onUnmounted(() => {
			if (container.value) {
				container.value.removeEventListener('mousemove', handleMouseMove);
				container.value.removeEventListener('mouseleave', resetTransform);
			}
		});

		return {
			container,
			imageRef,
			imgStyle,
			handleMouseMove,
			resetTransform,
		};
	},
});
</script>
