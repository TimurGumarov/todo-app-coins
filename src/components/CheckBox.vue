<script setup lang="ts">
import IconCheck from "../assets/icon-check.vue"

const modelChecked = defineModel<boolean>()
</script>

<template>
	<label class="checkbox">
		<input type="checkbox" v-model="modelChecked" />
		<IconCheck class="checkmark" />
	</label>
</template>

<style scoped>
.checkbox {
	display: block;
	position: relative;
	cursor: pointer;
	width: 24px;
	height: 24px;
	border: 2px solid rgb(21 84 59 / 80%);
	border-radius: 4px;
	flex-shrink: 0;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.checkbox input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}
.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 24px;
	width: 24px;
	opacity: 0;
	fill: rgb(0 189 113 / 80%);
}
.checkbox:hover {
	border-color: rgb(0 189 113 / 80%);
	box-shadow: rgb(0 189 113 / 20%) 0 0 10px 0;
}
.checkbox:has(input:checked) {
	border-color: rgb(0 189 113 / 80%);
}

/* On mouse-over, add a grey background color */
.checkbox:hover input ~ .checkmark {
	opacity: 0.4;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked ~ .checkmark {
	opacity: 1;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}
</style>
