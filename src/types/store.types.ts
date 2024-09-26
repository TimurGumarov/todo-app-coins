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
