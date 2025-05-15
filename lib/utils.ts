import { QueryProps } from '@/types'
import clsx, { ClassValue } from 'clsx'
import qs from 'query-string'
import { toast } from 'sonner'

import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
	return new Intl.NumberFormat('uz-UZ', {
		style: 'currency',
		currency: 'UZS',
	}).format(price)
}

export function formUrlQuery({ key, params, value }: QueryProps) {
	const currentUrl = qs.parse(params)
	currentUrl[key] = value!
	return qs.stringifyUrl(
		{ url: window.location.pathname, query: currentUrl },
		{ skipNull: true }
	)
}

export function removeUrlQuery({ params, key }: QueryProps) {
	const currentUrl = qs.parse(params)
	delete currentUrl[key]
	return qs.stringifyUrl(
		{ url: window.location.pathname, query: currentUrl },
		{ skipNull: true }
	)
}

export function showToastError(res: any) {
	if (res?.serverError || res?.validationErrors || !res?.data) {
		return toast.error('Something went wrong')
	}
	if (res.data.failure) {
		return toast.error(res.data.failure)
	}
}
