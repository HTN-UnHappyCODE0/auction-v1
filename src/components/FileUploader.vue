<template>
	<!-- vueimg -->
	<div
		ref="mainImageDropZoneRef"
		class="rounded-lg h-40 border flex items-center justify-center mt-2 transition-all overflow-hidden"
		:class="{'animate-pulse ring-4 ring-teal-500 bg-teal-500 ring-opacity-20': isOverDropZone}"
		@click="handleClick"
	>
		<div class="text-center cursor-pointer">
			<p>Drag some file here</p>
			<p class="text-xs mt-1 text-gray-500">or click here to upload</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useDropZone, useFileDialog} from '@vueuse/core';

const mainImageDropZoneRef = ref<HTMLDivElement>();
const emit = defineEmits(['onDrop', 'onChange']);

function onDrop(files: File[] | null) {
	emit('onDrop', files);
}

const props = defineProps<{multiple: boolean}>();
const {isOverDropZone} = useDropZone(mainImageDropZoneRef, {onDrop});
const {open, onChange} = useFileDialog({accept: 'image/*', multiple: props.multiple});

onChange((files) => {
	emit('onChange', files);
});

// Hàm wrapper cho sự kiện click
function handleClick(event: MouseEvent) {
	open();
}
</script>

<style></style>
