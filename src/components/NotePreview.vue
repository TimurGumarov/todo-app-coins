<script setup lang="ts">
import { PropType } from "vue"
import { Note } from "../store"

// This sets the number of tasks to preview for each note
const tasksPreviewCount = 2

const props = defineProps({
	note: Object as PropType<Note>,
})
</script>

<template>
	<div v-if="props.note" :key="props.note.id" @click="$emit('click')">
		<h3>{{ props.note.title }}</h3>
		<ul v-if="props.note.tasks?.length">
			<li
				v-for="task of props.note.tasks.slice(0, tasksPreviewCount)"
				:key="task.id"
			>
				{{ task.text }}
			</li>
			<li v-if="props.note.tasks.length > tasksPreviewCount">…</li>
		</ul>
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-flow: column;
	gap: 10px;
	border-radius: 10px;
	background: linear-gradient(97deg, #202a39 -8.29%, #151d29 70.65%);
	box-shadow: rgba(18, 18, 18, 0.25) 0px 0 0 0, rgba(0, 0, 0, 0.3) 0px 0 0 0;
	margin: 0;
	padding: 20px;
	cursor: pointer;
	transition: box-shadow 0.2s ease-in-out;
}

div:hover {
	box-shadow: rgba(18, 18, 18, 0.25) 0px 5px 20px -1px,
		rgba(0, 0, 0, 0.3) 0px 3px 3px -1px;
}

h3 {
	margin: 0;
}
</style>
