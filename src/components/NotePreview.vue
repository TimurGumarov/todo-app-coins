<script setup lang="ts">
import { PropType } from "vue"
import { Note, Task } from "../store"
import IconDash from "../assets/icon-dash.vue"
import IconCheck from "../assets/icon-check.vue"

// This sets the number of tasks to preview for each note
const tasksPreviewCount = 4

const props = defineProps({
	note: Object as PropType<Note>,
})

function chooseIcon(task: Task) {
	return task.status ? IconCheck : IconDash
}
</script>

<template>
	<div v-if="props.note" :key="props.note.id" @click="$emit('click')">
		<h3>{{ props.note.title }}</h3>
		<ul v-if="props.note.tasks?.length">
			<li
				v-for="task of props.note.tasks.slice(0, tasksPreviewCount)"
				:key="task.id"
			>
				<component
					class="statusIcon"
					:class="{ check: task.status }"
					:is="chooseIcon(task)"
				/>
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
	box-shadow: rgb(17 65 133 / 25%) 0px 0 0 0, rgb(0 0 0 / 30%) 0px 0 0 0;
	margin: 0;
	padding: 20px;
	cursor: pointer;
	transition: box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

div:hover {
	box-shadow: rgb(17 65 133 / 25%) 0px 5px 20px -1px,
		rgb(0 0 0 / 30%) 0px 3px 3px -1px;
}

h3 {
	margin: 0;
}
.statusIcon {
	width: 16px;
	height: 16px;
	fill: white;
	transform: translateY(3px);
}
.statusIcon.check {
	fill: rgb(0, 227, 136);
}
</style>
