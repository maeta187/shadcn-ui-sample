export type SignupResult =
	| {
			success: true
			message: string
	  }
	| {
			success: false
			message: string
			status: number
			error?: unknown
	  }
