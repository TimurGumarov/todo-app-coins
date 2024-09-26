<script setup lang="ts">
import { computed, PropType, ref } from "vue"
import TextInputPreview from "@/components/TextInputPreview.vue"
import CheckBox from "@/components/CheckBox.vue"
import Button from "@/components/Button.vue"
import iconArrowLeft from "@/assets/icon-arrow-left.vue"
import Popup from "@/components/Popup.vue"

import { type Note, type Task, store } from "@/store"
import { PopupProps } from "@/types"

const emit = defineEmits(["exitEditing"])

const props = defineProps({
	note: {
		type: Object as PropType<Note>,
		required: true,
	},
})

const blankPopupProps: PopupProps = { isOpen: false, text: "" }

const isSaved = ref(true)
const title = ref<string>(props.note.title)
const tasks = ref<Task[]>(JSON.parse(JSON.stringify(props.note.tasks)))
const popupProps = ref<PopupProps>(blankPopupProps)

const bigTitleMinLength = 23
const titleIsBig = computed(() =>
	title.value.length > bigTitleMinLength ? true : false
)

function toggleSaveStatus() {
	if (isSaved) isSaved.value = false
	console.log(isSaved)
}

function saveNote() {
	props.note.title = title.value
	props.note.tasks = tasks.value
	isSaved.value = true
}

function deleteNote() {
	store.deleteNote(props.note.id)
	exit()
}

function createNewTask() {
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
	<button class="back" @click="goBack">
		<iconArrowLeft class="icon" :style="{ fill: 'white' }" />
	</button>
	<TextInputPreview
		class="heading1"
		:class="{ bigTitle: titleIsBig }"
		:tag="'h1'"
		v-model="title"
		v-on:enter-editing="toggleSaveStatus"
	/>
	<div class="note">
		<ul v-if="tasks.length">
			<li v-for="task of tasks" :key="task.id">
				<CheckBox v-model="task.status" v-on:click="toggleSaveStatus" />
				<TextInputPreview
					class="paragraph"
					v-model="task.text"
					v-on:enter-editing="toggleSaveStatus"
				/>
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
button.back:hover::after {
	content: "Назад";
	position: absolute;
	display: block;
	top: -35px;
	left: 35%;
	padding: 4px 8px;
	line-height: 1.1;
	color: rgb(0 147 88 / 80%);
	border: 2px solid rgb(21 84 59 / 80%);
	border-radius: 8px;
	background: #161f2c;
	transform: translateX(-50%);
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
