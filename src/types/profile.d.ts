type ProfileData = {
	user_name: string
	user_name_kana: string
	gender: string
	prefecture: string
	phone_number: string
	created_at: string
	updated_at: string
}

type Profile = {
	id: string
	userName: string
	userNameKana: string
	gender: Gender
	prefecture: string
	phoneNumber: string
	createdAt: string
	updatedAt: string
}
