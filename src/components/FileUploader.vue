<template>
	<div
		ref="mainImageDropZoneRef"
		class="rounded-lg h-40 flex items-center justify-center mt-2 transition-all overflow-hidden"
		:class="{'animate-pulse ring-4 ring-teal-500 bg-teal-500 ring-opacity-20 ': isOverDropZone}"
		@Click="open"
	>
		<div class="text-center cursor-pointer">
			<p>Drag some file here</p>
			<p class="text-xs mt-1 text-gray-500">or click here to upload</p>
		</div>
	</div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import { useDropZone } from '@vueuse/core'';
const isOverDropZone = ref();
const mainImageDropZoneRef = ref<HTMLDivElement>();
const emit = defineEmits(['onDrop','onChange']);
function onDrop(files: File[] | null) {
emit('onDrop', files);
}
const {isOverDropZone} = useDropZone(mainImageDropZoneRef, {onDrop,});
</script>
<style lang=""></style>
