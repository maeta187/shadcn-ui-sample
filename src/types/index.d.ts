import type {
	LoginFormType,
	ProfileFormType,
	ResetPassWordFormType,
	SetPassWordFormType,
	SignupFormType,
	UpdateProfileType
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
	ProfileFormType,
	ResetPassWordFormType,
	SetPassWordFormType,
	SignupFormType,
	SignupResult,
	UpdateProfileType
}
