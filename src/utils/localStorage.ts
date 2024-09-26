import { store } from "../store"

export function saveStore() {
	localStorage.setItem("notesStore", JSON.stringify(store.notes))
}

export function getNotes() {
	return localStorage.getItem("notesStore")
}
