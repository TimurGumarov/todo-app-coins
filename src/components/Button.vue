<script setup lang="ts">
import { PropType } from "vue"
import IconAdd from "@/assets/icon-add.vue"
import IconCheckCircle from "@/assets/icon-check-circle.vue"
import IconCloseCircle from "@/assets/icon-close-circle.vue"

const props = defineProps({
	type: {
		type: String as PropType<"add" | "confirm" | "warn" | "reject">,
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
})
</script>

<template>
	<button class="button" :class="[props.type]" :disabled="props.disabled">
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
			v-if="props.type === 'reject'"
			class="icon"
			:style="{ fill: 'rgb(197 79 79)' }"
		/>
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
	justify-content: center;
	align-items: center;
	gap: 5px;
	padding: 10px;
	background: none;
	color: inherit;
	font: inherit;
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
.button.reject:hover:not(:disabled) {
	--accent-color: rgb(197 79 79);
	--shadow-color: rgb(197 79 79 / 100%);
}
</style>
