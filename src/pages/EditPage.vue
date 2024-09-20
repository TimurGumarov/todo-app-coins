<script setup lang="ts">
import { store } from "../store"
import iconArrowLeft from "../assets/icon-arrow-left.vue"
import TextInputPreview from "../components/TextInputPreview.vue"

const props = defineProps({
	id: Number,
})

let newNote = false
if (props.id === -1) newNote = true

const currentNote = store.notes.filter((note) => note.id === props.id)?.pop()
const bigTitleMinLength = 25
const titleIsBig =
	currentNote && currentNote.title.length > bigTitleMinLength ? true : false
</script>

<template>
	<div class="layout">
		<button class="back" @click="$emit('exitEditing')">
			<iconArrowLeft class="icon" :style="{ fill: 'white' }" />
		</button>
		<TextInputPreview
			class="heading1"
			:class="{ bigTitle: titleIsBig }"
			v-if="currentNote"
			v-model="currentNote.title"
			:tag="'h1'"
		/>
		<div class="note" v-if="currentNote">
			<ul v-if="currentNote.tasks?.length">
				<li v-for="task of currentNote.tasks" :key="task.id">
					<TextInputPreview class="paragraph" v-model="task.text" />
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.layout {
	position: relative;
	display: flex;
	flex-flow: column;
	gap: 20px;
}
button.back {
	position: absolute;
	display: flex;
	flex-flow: row;
	align-items: center;
	justify-content: left;
	top: 20px;
	left: 10px;
	background: none;
	color: inherit;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	width: 40px;
	height: 40px;
	border: none;
	z-index: 1000;
}
button.back .icon {
	width: 30px;
	height: 30px;
}
.note {
	display: flex;
	flex-flow: column;
	gap: 10px;
}
:deep(.bigTitle) {
	text-align: left;
	text-indent: 50px;
}
.note ul {
	display: flex;
	flex-flow: column;
	gap: 10px;
}
</style>
