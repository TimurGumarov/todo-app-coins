<script setup lang="ts">
import IconAdd from "../assets/icon-add.vue"
</script>

<template>
	<button class="button add">
		<IconAdd class="icon" :style="{ fill: 'rgb(0 154 92)' }" />
	</button>
</template>

<style>
.button.add {
	position: relative;
	background: none;
	color: inherit;
	padding: 10px 10px 6px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	width: 100%;
	border: 2px solid rgb(0 154 92 / 50%);
	box-shadow: rgb(0 189 113 / 20%) 0 0 0 0;
	border-radius: 10px;
	transition: box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1),
		border-color 0.2s ease-in-out;
}
.button.add:hover {
	border: 2px solid rgb(0 154 92);
	box-shadow: rgb(0 189 113 / 80%) 0 0 10px 0;
}
.button.add .icon {
	width: 20px;
	height: 20px;
}
</style>
