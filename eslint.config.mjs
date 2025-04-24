import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintPluginNext from '@next/eslint-plugin-next'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default defineConfig([
	{
		files: ['src/**/*.{ts,tsx}'],
		extends: compat.extends(
			'plugin:@typescript-eslint/recommended',
			'next/core-web-vitals',
			'prettier'
		),
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.json'
			}
		},
		plugins: {
			react: eslintPluginReact,
			'react-hooks': eslintPluginReactHooks,
			'@next/next': eslintPluginNext
		},
		rules: {
			'no-console': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			...eslintPluginReactHooks.configs.recommended.rules,
			...eslintPluginNext.configs.recommended.rules,
			...eslintPluginNext.configs['core-web-vitals'].rules
			// 'import/order': [
			// 	'error',
			// 	{
			// 		// 自動並び替えとバッティングするので糖度調整
			// 		groups: [
			// 			'external',
			// 			'internal',
			// 			'parent',
			// 			'sibling',
			// 			'object',
			// 			'index',
			// 			'type',
			// 			'builtin'
			// 		],
			// 		pathGroups: [
			// 			{
			// 				pattern: '{react,react-dom/**,react-router-dom}',
			// 				group: 'builtin',
			// 				position: 'before'
			// 			}
			// 		],
			// 		pathGroupsExcludedImportTypes: ['builtin'],
			// 		alphabetize: {
			// 			order: 'asc'
			// 		}
			// 	}
			// ]
		}
	},
	eslintConfigPrettier
])
