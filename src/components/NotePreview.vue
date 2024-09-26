<script setup lang="ts">
import { PropType, ref } from "vue"
import Popup from "./Popup.vue"
import Button from "./Button.vue"
import IconDash from "@/assets/icon-dash.vue"
import IconCheck from "@/assets/icon-check.vue"

import { store, type Note, type Task } from "@/store"
import { PopupProps } from "@/types"
import { saveStore } from "@/utils/localStorage"

defineEmits(["click"])

// This sets the number of tasks to preview for each note
const tasksPreviewCount = 4

const blankPopupProps: PopupProps = { isOpen: false, text: "" }

const props = defineProps({
	note: Object as PropType<Note>,
})
const popupProps = ref<PopupProps>(blankPopupProps)

function chooseIcon(task: Task) {
	return task.status ? IconCheck : IconDash
}

function openPopupDelete(id: Note["id"]) {
	popupProps.value = {
		isOpen: true,
		text: "Вы уверены, что хотите удалить заметку?",
		buttons: [
			{
				type: "confirm",
				text: "Да, удалить",
				callback: () => {
					deleteNote(id)
				},
			},
			{
				type: "reject",
				text: "Нет",
			},
		],
	}
}

function deleteNote(id: Note["id"]) {
	store.deleteNote(props.note.id)
}
</script>

<template>
	<div v-if="props.note" :key="props.note.id" @click="$emit('click')">
		<Button
			type="remove"
			class="removeButton"
			@click.stop="openPopupDelete(props.note.id)"
		/>
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
	<Popup
		v-if="popupProps.isOpen"
		v-bind="popupProps"
		v-on:popup-closed="popupProps = blankPopupProps"
	/>
</template>

<style scoped>
div {
	position: relative;
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

div .removeButton {
	position: absolute;
	top: 5px;
	right: 5px;
}

h3 {
	margin: 0;
	width: calc(100% - 50px);
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
