<script setup lang="ts">
import { type Note, type Task, store } from "../store"
import iconArrowLeft from "../assets/icon-arrow-left.vue"
import TextInputPreview from "../components/TextInputPreview.vue"
import CheckBox from "../components/CheckBox.vue"
import Button from "../components/Button.vue"
import { computed, PropType, ref } from "vue"

const emit = defineEmits(["exitEditing"])

const props = defineProps({
	note: {
		type: Object as PropType<Note>,
		required: true,
	},
})

const title = ref<string>(props.note.title)
const tasks = ref<Task[]>(JSON.parse(JSON.stringify(props.note.tasks)))

const bigTitleMinLength = 23
const titleIsBig = computed(() =>
	title.value.length > bigTitleMinLength ? true : false
)

function saveNote() {
	props.note.title = title.value
	props.note.tasks = tasks.value
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

function exit() {
	emit("exitEditing")
}
</script>

<template>
	<button class="back" @click="exit">
		<iconArrowLeft class="icon" :style="{ fill: 'white' }" />
	</button>
	<TextInputPreview
		class="heading1"
		:class="{ bigTitle: titleIsBig }"
		v-model="title"
		:tag="'h1'"
	/>
	<div class="note">
		<ul v-if="tasks.length">
			<li v-for="task of tasks" :key="task.id">
				<CheckBox v-model="task.status" />
				<TextInputPreview class="paragraph" v-model="task.text" />
			</li>
		</ul>
		<Button :type="'add'" @click="createNewTask" />
		<div class="buttons">
			<Button :type="'confirm'" :text="'Сохранить'" @click="saveNote" />
			<Button :type="'reject'" :text="'Удалить'" @click="deleteNote" />
		</div>
	</div>
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
