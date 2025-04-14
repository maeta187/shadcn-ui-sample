export type Prefecture = {
	code: number
	name: string
}

export type PrefectureOptions = { value: string; label: string }

export type PrefectureResponse = {
	data: {
		[queryName: string]: Prefecture[]
	}
}
