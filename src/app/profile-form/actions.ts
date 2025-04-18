'use server'
import { PrefectureResponse } from '@/types'
import { NextResponse } from 'next/server'

const END_POINT = process.env.END_POINT!
const API_KEY = process.env.API_KEY!

const query = `
query {
  prefecture {
    code
    name
  }
}
`

export async function getPrefecture(queryName: string) {
	try {
		const response = await fetch(END_POINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				apikey: API_KEY
			},
			body: JSON.stringify({ query })
		})

		// レスポンスが正常でない場合はエラーをスロー
		if (!response.ok) {
			return NextResponse.json({
				error: `Failed to fetch data: ${response.statusText}`,
				status: response.status
			})
		}

		// レスポンスをJSON形式で取得
		const data = (await response.json()) as PrefectureResponse
		return Object.values(data.data[queryName]).map((v) => v)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				error: `${error.message}`,
				status: 500
			})
		}
		return NextResponse.json({
			error: 'An unknown error occurred'
		})
	}
}
