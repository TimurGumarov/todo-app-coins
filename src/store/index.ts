import { reactive } from "vue"

export type Note = {
	id: number
	title: string
	tasks: Task[]
}

export type Task = {
	id: number
	status: boolean
	text: string
}

export const store = reactive({
	notes: [] as Note[],
	addNote({ id, title, tasks }: Note) {
		this.notes.push({ id, title, tasks } as Note)
	},
	newNote() {
		const allIDs = this.notes.map((note) => note.id)
		const newID = allIDs.length ? Math.max(...allIDs) + 1 : 1
		const newNote: Note = { id: newID, title: "Новая заметка", tasks: [] }
		this.notes.push(newNote)
		return newNote
	},
	deleteNote(id: Note["id"]) {
		const note = this.notes.find((note) => note.id === id)
		if (!note) return false
		const indexOfNote = this.notes.indexOf(note)
		this.notes.splice(indexOfNote, 1)
		return true
	},
})

// Temporary code
store.addNote({
	id: 1,
	title: "Note One",
	tasks: [],
})

store.addNote({
	id: 2,
	title: "Note Two",
	tasks: [
		{ id: 1, status: false, text: "todo1" },
		{ id: 2, status: false, text: "todo2" },
		{ id: 3, status: false, text: "todo3" },
		{ id: 4, status: false, text: "todo4" },
	],
})

store.addNote({
	id: 3,
	title: "Note Three",
	tasks: [
		{ id: 1, status: false, text: "todo1" },
		{ id: 2, status: false, text: "todo2" },
		{ id: 3, status: false, text: "todo3" },
		{ id: 4, status: false, text: "todo4" },
		{ id: 5, status: false, text: "todo5" },
		{ id: 6, status: false, text: "todo6" },
	],
})
