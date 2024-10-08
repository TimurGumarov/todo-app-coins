<script setup lang="ts">
import { PropType } from "vue"
import IconArrowLeft from "../assets/icon-arrow-left.vue"
import IconAdd from "../assets/icon-add.vue"
import IconCheckCircle from "../assets/icon-check-circle.vue"
import IconCloseCircle from "../assets/icon-close-circle.vue"
import IconUndo from "../assets/icon-undo.vue"
import IconRedo from "../assets/icon-redo.vue"

const props = defineProps({
	type: {
		type: String as PropType<
			| "back"
			| "add"
			| "remove"
			| "confirm"
			| "warn"
			| "reject"
			| "undo"
			| "redo"
			| "remove"
		>,
		required: true,
	},
	text: {
		type: String,
		required: false,
		default: "",
	},
	disabled: {
		type: Boolean,
		required: false,
		default: false,
	},
	callback: {
		type: Function,
		required: false,
	},
})
</script>

<template>
	<button
		class="button"
		:class="[props.type]"
		:disabled="props.disabled"
		v-on:click="
			() => {
				props.callback?.()
			}
		"
	>
		<IconArrowLeft
			v-if="props.type === 'back'"
			class="icon"
			:style="{ fill: 'white' }"
		/>
		<IconAdd
			v-if="props.type === 'add'"
			class="icon"
			:style="{ fill: 'rgb(0 154 92)' }"
		/>
		<IconCheckCircle
			v-if="props.type === 'confirm'"
			class="icon"
			:style="{ fill: 'rgb(0 154 92)' }"
		/>
		<IconCloseCircle
			v-if="['reject', 'remove'].includes(props.type)"
			class="icon"
		/>
		<IconUndo v-if="props.type === 'undo'" class="icon" />
		<IconRedo v-if="props.type === 'redo'" class="icon" />
		{{ props.text }}
	</button>
</template>

<style scoped>
.button {
	--accent-color: rgb(0 154 92 / 50%);
	--shadow-color: rgb(0 154 92 / 20%);
	--muted-color: rgb(0 154 92 / 6%);

	position: relative;
	display: flex;
	flex-flow: row;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	gap: 5px;
	padding: 10px;
	background: none;
	color: inherit;
	font: inherit;
	white-space: nowrap;
	cursor: pointer;
	outline: inherit;
	width: 100%;
	border: 2px solid var(--accent-color);
	border-radius: 10px;
	box-shadow: var(--shadow-color) 0 0 0 0;
	transition: box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1),
		border-color 0.2s ease-in-out;
}
.button:disabled {
	color: var(--shadow-color);
	background: repeating-linear-gradient(
		-55deg,
		transparent,
		transparent 18px,
		var(--muted-color) 18px,
		var(--muted-color) 20px
	);
	cursor: not-allowed;
}
.button:hover:not(:disabled) {
	box-shadow: var(--shadow-color) 0 0 10px 0;
}
.button .icon {
	width: 20px;
	height: 20px;
}
button.back {
	justify-content: left;
	background: none;
	padding: 0;
	width: 40px;
	height: 40px;
	border: none;
	box-shadow: none;
}
button.back:hover:not(:disabled) {
	box-shadow: none;
}
button.back:hover::after {
	content: "Назад";
	position: absolute;
	display: block;
	top: -35px;
	left: 35%;
	padding: 4px 8px;
	line-height: 1.1;
	color: rgb(0 147 88 / 80%);
	border: 1px solid rgb(21 84 59 / 80%);
	border-radius: 8px;
	background: #161f2c;
	transform: translateX(-50%);
}
button.back .icon {
	width: 30px;
	height: 30px;
}
.button.add,
.button.confirm {
	--accent-color: rgb(0 154 92 / 50%);
	--shadow-color: rgb(0 154 92 / 20%);
	--muted-color: rgb(0 154 92 / 6%);
}
.button.add:hover:not(:disabled),
.button.confirm:hover:not(:disabled) {
	--accent-color: rgb(0 154 92);
	--shadow-color: rgb(0 189 113 / 80%);
}
.button.remove {
	--accent-color: rgb(197 79 79 / 50%);
	--shadow-color: rgb(197 79 79 / 20%);
	--muted-color: rgb(197 79 79 / 0%);

	width: auto;
	border-color: var(--muted-color);
}
.button.remove .icon {
	fill: var(--shadow-color);
}
.button.remove:hover:not(:disabled) {
	--accent-color: rgb(197 79 79);
	--shadow-color: rgb(197 79 79 / 100%);

	border-color: var(--accent-color);
}
.button.warn {
	--accent-color: rgb(245 138 19 / 50%);
	--shadow-color: rgb(245 138 19 / 20%);
	--muted-color: rgb(245 138 19 / 6%);
}
.button.warn:hover:not(:disabled) {
	--accent-color: rgb(245 138 19 / 90%);
	--shadow-color: rgb(245 138 19 / 80%);
}
.button.reject {
	--accent-color: rgb(197 79 79 / 50%);
	--shadow-color: rgb(197 79 79 / 20%);
	--muted-color: rgb(197 79 79 / 6%);
}
.button.reject .icon {
	fill: rgb(197 79 79);
}
.button.reject:hover:not(:disabled) {
	--accent-color: rgb(197 79 79);
	--shadow-color: rgb(197 79 79 / 100%);
}
.button.undo,
.button.redo {
	width: auto;
	border: none;
	box-shadow: none;
}
.button .icon,
.button .icon {
	fill: white;
}
.button.undo:hover:not(:disabled),
.button.redo:hover:not(:disabled) {
	box-shadow: none;
	text-decoration: underline;
}
.button.undo:disabled,
.button.redo:disabled {
	color: rgb(256 256 256 / 20%);
	background: none;
}
.button.undo:disabled .icon,
.button.redo:disabled .icon {
	fill: rgb(256 256 256 / 20%);
}
</style>
