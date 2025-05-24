import { toast } from '@/hooks/use-toast'
import { QueryProps } from '@/types'
import clsx, { ClassValue } from 'clsx'
import qs from 'query-string'

import { twMerge } from 'tailwind-merge'
import { TransactionState } from './constants'

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
		return toast({ description: 'Server error', variant: 'destructive' })
	}
	if (res.data.failure) {
		return toast({ description: res.data.failure, variant: 'destructive' })
	}
}

export const getStatusText = (status: number) => {
	switch (status) {
		case TransactionState.Pending:
			return 'Pending'
		case TransactionState.Paid:
			return 'Paid'
		case TransactionState.PaidCancelled:
			return 'Cancelled'
		case TransactionState.PendingCancelled:
			return 'Cancelled'
		default:
			return 'Unknown'
	}
}
export const getStatusVariant = (status: number) => {
	switch (status) {
		case TransactionState.Pending:
			return 'outline'
		case TransactionState.Paid:
			return 'default'
		case TransactionState.PaidCancelled:
			return 'destructive'
		case TransactionState.PendingCancelled:
			return 'destructive'
		default:
			return 'secondary'
	}
}

export const sliceText = (text: string, length: number) => {
	if (text.length > length) {
		return text.slice(0, length) + '...'
	}
	return text
}
