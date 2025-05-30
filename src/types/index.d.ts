import type {
	LoginFormType,
	ResetPassWordFormType,
	SetPassWordFormType,
	SignupFormType
} from '@/types/formType'
import type {
	Prefecture,
	PrefectureOptions,
	PrefectureResponse
} from '@/types/prefectures'
import type { SignupResult } from '@/types/signup'

export type Gender = {
	MEN: 'MEN'
	WOMEN: 'WOMEN'
	OTHER: 'OTHER'
}

export {
	LoginFormType,
	Prefecture,
	PrefectureOptions,
	PrefectureResponse,
	ResetPassWordFormType,
	SetPassWordFormType,
	SignupFormType,
	SignupResult
}
