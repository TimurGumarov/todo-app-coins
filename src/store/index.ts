import { reactive } from "vue"

import { Note } from "../types"

export const store = reactive({
	notes: [] as Note[],
	setNotes(notes: Note[]) {
		this.notes = notes
	},
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
