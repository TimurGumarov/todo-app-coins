<script setup lang="ts">
import { computed, PropType, ref } from "vue"
import TextInputPreview from "@/components/TextInputPreview.vue"
import CheckBox from "@/components/CheckBox.vue"
import Button from "@/components/Button.vue"
import iconArrowLeft from "@/assets/icon-arrow-left.vue"
import Popup from "@/components/Popup.vue"

import { store } from "@/store"
import { PopupProps, Note, Task } from "@/types"
import { saveStore } from "@/utils/localStorage"

const emit = defineEmits(["exitEditing"])

const props = defineProps({
	note: {
		type: Object as PropType<Note>,
		required: true,
	},
})

const blankPopupProps: PopupProps = { isOpen: false, text: "" }
let tempNote: Note = undefined

const isSaved = ref(true)
const isUndoActive = ref(false)
const title = ref<string>(props.note.title)
const tasks = ref<Task[]>(JSON.parse(JSON.stringify(props.note.tasks)))
const popupProps = ref<PopupProps>(blankPopupProps)

const bigTitleMinLength = 23
const titleIsBig = computed(() =>
	title.value.length > bigTitleMinLength ? true : false
)

function toggleSaveStatus() {
	if (isSaved) isSaved.value = false
	isUndoActive.value = false
}

function undo() {
	isUndoActive.value = true
	tempNote = {
		id: props.note.id,
		title: title.value,
		tasks: JSON.parse(JSON.stringify(tasks.value)),
	}
	title.value = props.note.title
	tasks.value = JSON.parse(JSON.stringify(props.note.tasks))
}

function redo() {
	isUndoActive.value = false
	title.value = tempNote.title
	tasks.value = JSON.parse(JSON.stringify(tempNote.tasks))
}

function saveNote() {
	if (isUndoActive) {
		props.note.title = title.value
		props.note.tasks = tasks.value
	}
	isSaved.value = true
	isUndoActive.value = false
	saveStore()
}

function deleteNote() {
	store.deleteNote(props.note.id)
	saveStore()
	exit()
}

function deleteTask(id: Task["id"]) {
	toggleSaveStatus()
	const task = tasks.value.find((note) => note.id === id)
	const indexOfTask = tasks.value.indexOf(task)
	tasks.value.splice(indexOfTask, 1)
	return true
}

function createNewTask() {
	toggleSaveStatus()
	const allTasksIDs = tasks.value.map((task) => task.id)
	const newID = allTasksIDs.length ? Math.max(...allTasksIDs) + 1 : 1
	const newTask: Task = { id: newID, status: false, text: "" }
	tasks.value.push(newTask)
}

function goBack() {
	if (isSaved.value) {
		exit()
		return
	}
	openPopupGoBack()
}

function exit() {
	emit("exitEditing")
}

function openPopupDelete() {
	popupProps.value = {
		isOpen: true,
		text: "Вы уверены, что хотите удалить заметку?",
		buttons: [
			{
				type: "confirm",
				text: "Да, удалить",
				callback: () => {
					deleteNote()
					exit()
				},
			},
			{
				type: "reject",
				text: "Нет",
			},
		],
	}
}

function openPopupGoBack() {
	popupProps.value = {
		isOpen: true,
		text: "Cохранить изменения перед выходом?",
		buttons: [
			{
				type: "confirm",
				text: "Да, сохранить и выйти",
				callback: () => {
					saveNote()
					exit()
				},
			},
			{
				type: "reject",
				text: "Не сохранять и выйти",
				callback: () => {
					exit()
				},
			},
			{
				type: "warn",
				text: "Продолжить редактирование",
			},
		],
	}
}
</script>

<template>
	<Button class="buttonBack" type="back" @click="goBack" />
	<TextInputPreview
		class="heading1"
		:class="{ bigTitle: titleIsBig }"
		:tag="'h1'"
		v-model="title"
		v-on:enter-editing="toggleSaveStatus"
	/>
	<div class="undo-redo">
		<Button
			v-if="!isUndoActive"
			type="undo"
			text="Отменить изменения"
			v-on:click="undo"
			:disabled="isSaved"
		/>
		<Button
			v-if="isUndoActive"
			type="redo"
			text="Вернуть изменения"
			v-on:click="redo"
		/>
	</div>
	<div class="note">
		<ul v-if="tasks.length">
			<li v-for="task of tasks" :key="task.id">
				<CheckBox v-model="task.status" v-on:click="toggleSaveStatus" />
				<TextInputPreview
					class="paragraph"
					v-model="task.text"
					v-on:enter-editing="toggleSaveStatus"
				/>
				<Button type="remove" @click="deleteTask(task.id)" />
			</li>
		</ul>
		<Button :type="'add'" @click="createNewTask" />
		<div class="buttons">
			<Button
				:type="'confirm'"
				:text="'Сохранить'"
				v-bind:disabled="isSaved"
				@click="saveNote"
			/>
			<Button
				:type="'reject'"
				:text="'Удалить'"
				@click="openPopupDelete"
			/>
		</div>
	</div>
	<Popup
		v-if="popupProps.isOpen"
		v-bind="popupProps"
		v-on:popup-closed="popupProps = blankPopupProps"
	/>
</template>

<style scoped>
.buttonBack {
	position: absolute;
	top: 20px;
	left: 10px;
	z-index: 100;
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
.note li {
	display: flex;
	flex-flow: row;
	gap: 4px;
	align-items: center;
}
.buttons {
	display: flex;
	flex-flow: row;
	width: 100%;
	gap: 10px;
}
</style>
