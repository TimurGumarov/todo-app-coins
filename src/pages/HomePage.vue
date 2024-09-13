<script setup lang="ts">
import { store } from "../store"

// This sets the number of tasks to preview for each note
const tasksPreviewCount = 2
</script>

<template>
	<h1>Home</h1>
	<div>
		<div v-for="note of store.notes" :key="note.id">
			<h3>{{ note.title }}</h3>
			<ul v-if="note.tasks?.length">
				<li
					v-for="task of note.tasks.slice(0, tasksPreviewCount)"
					:key="task.id"
				>
					{{ task.text }}
				</li>
				<li v-if="note.tasks.length > tasksPreviewCount">…</li>
			</ul>
		</div>
	</div>
</template>
