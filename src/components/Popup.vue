<script setup lang="ts">
import { PropType, ref } from "vue"
import { ButtonProps } from "@/types"
import Button from "./Button.vue"

const emit = defineEmits(["popupClosed"])

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	buttons: {
		type: Array as PropType<Array<ButtonProps>>,
		required: false,
		default: [],
	},
})

const isOpen = ref(props.isOpen)

function close() {
	isOpen.value = false
	emit("popupClosed")
}
</script>

<template>
	<div v-if="isOpen" class="popup">
		<h2>{{ props.text }}</h2>
		<div class="buttons">
			<Button
				v-for="prop of props.buttons"
				v-on:click="close"
				v-bind="prop"
			/>
		</div>
	</div>
	<div v-if="isOpen" class="backdrop" v-on:click="close"></div>
</template>

<style scoped>
.backdrop {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border-radius: 18px;
	background: rgb(0 0 0 / 10%);
	backdrop-filter: blur(4px);
	z-index: 10000;
}
.popup {
	position: fixed;
	left: 50%;
	top: 50%;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	min-width: 200px;
	padding: 20px;
	border-radius: 20px;
	background: #0f1923;
	transform: translate(-50%, -50%);
	z-index: 10001;
}
h2 {
	font-weight: bold;
	text-align: center;
	margin: 1em;
}
.buttons {
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	gap: 20px;
	width: 100%;
}
.buttons :deep(.button) {
	flex-basis: 150px;
}
</style>
